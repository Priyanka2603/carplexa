const db = require('../models');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const resources = {
  users: {
    model: 'users',
    attributes: ['id', 'first_name', 'last_name', 'email', 'profile_image', 'role', 'dealership_name', 'phone', 'location', 'status', 'createdAt', 'updatedAt'],
    editable: ['status']
  },
  cars: {
    model: 'cars',
    attributes: ['id', 'user_id', 'vin', 'vehicle_year', 'vehicle_make', 'vehicle_model', 'vehicle_trim', 'vehicle_body', 'engine', 'vehicle_doors', 'vehicle_type', 'clean_title', 'condition', 'service_history', 'previous_owners', 'fuel_type', 'transmission', 'drive_type', 'asking_price', 'description', 'status', 'createdAt', 'updatedAt'],
    editable: ['status']
  },
  brands: {
    model: 'brands',
    attributes: ['id', 'name', 'slug', 'logo', 'description', 'status', 'createdAt', 'updatedAt'],
    editable: ['status']
  },
  faqs: {
    model: 'faqs',
    attributes: ['id', 'question', 'answer', 'sort_order', 'status', 'createdAt', 'updatedAt'],
    editable: ['question', 'answer', 'sort_order', 'status']
  },
  user_reports: {
    model: 'user_reports',
    attributes: ['id', 'reporter_id', 'reported_id', 'reason', 'description', 'status', 'createdAt', 'updatedAt'],
    editable: ['status']
  },
  ratings_reviews: {
    model: 'ratings_reviews',
    attributes: ['id', 'user_id', 'reviewed_user_id', 'rating', 'review', 'status', 'createdAt', 'updatedAt'],
    editable: ['status']
  },
  chat_rooms: {
    model: 'chat_rooms',
    attributes: ['id', 'sender_id', 'receiver_id', 'last_message_id', 'status', 'createdAt', 'updatedAt'],
    editable: ['status']
  },
  messages: {
    model: 'messages',
    attributes: ['id', 'room_id', 'sender_id', 'receiver_id', 'message', 'message_type', 'file_url', 'is_read', 'status', 'createdAt', 'updatedAt'],
    editable: ['is_read', 'status']
  },
  notifications: {
    model: 'notifications',
    attributes: ['id', 'sender_id', 'receiver_id', 'title', 'message', 'notification_type', 'reference_id', 'is_read', 'status', 'createdAt', 'updatedAt'],
    editable: ['is_read', 'status']
  }
};

function sendError(res, err, message) {
  console.error(message, err);
  return res.status(500).json({ success: false, message });
}

module.exports = {
  getOverview: async (req, res) => {
    try {
      const [users, cars, brands, pendingReports, listingStatuses] = await Promise.all([
        db.users.count(),
        db.cars.count(),
        db.brands.count(),
        db.user_reports.count({ where: { status: 'pending' } }),
        db.cars.findAll({
          attributes: ['status', [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'count']],
          group: ['status'],
          raw: true
        })
      ]);

      return res.status(200).json({
        success: true,
        data: { users, cars, brands, pendingReports, listingStatuses }
      });
    } catch (err) {
      return sendError(res, err, 'Unable to load admin overview');
    }
  },

  list: async (req, res) => {
    const resource = resources[req.params.resource];
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Admin resource not found' });
    }

    try {
      const order = resource.model === 'faqs' ? [['sort_order', 'ASC'], ['id', 'DESC']] : [['createdAt', 'DESC']];
      const options = { attributes: resource.attributes, order };
      if (resource.model === 'cars') {
        options.include = [{
          model: db.car_images,
          as: 'car_images',
          attributes: ['id', 'image_url', 'sort_order'],
          required: false
        }];
      }
      const data = await db[resource.model].findAll(options);
      return res.status(200).json({ success: true, data });
    } catch (err) {
      return sendError(res, err, `Unable to load ${req.params.resource}`);
    }
  },

  createFaq: async (req, res) => {
    const { question, answer, sort_order = 0, status = 'active' } = req.body;
    if (typeof question !== 'string' || !question.trim() || typeof answer !== 'string' || !answer.trim()) {
      return res.status(400).json({ success: false, message: 'Question and answer are required' });
    }
    if (!Number.isInteger(Number(sort_order)) || Number(sort_order) < 0) {
      return res.status(400).json({ success: false, message: 'Sort order must be a non-negative integer' });
    }
    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be active or inactive' });
    }

    try {
      const data = await db.faqs.create({ question: question.trim(), answer: answer.trim(), sort_order: Number(sort_order), status });
      return res.status(201).json({ success: true, data });
    } catch (err) {
      return sendError(res, err, 'Unable to create FAQ');
    }
  },

  createBrand: async (req, res) => {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const slugInput = typeof req.body.slug === 'string' ? req.body.slug.trim() : '';
    const slug = slugInput || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const description = typeof req.body.description === 'string' ? req.body.description.trim() : null;
    const status = req.body.status || 'active';
    const logo = req.files?.logo;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Brand name is required' });
    }
    if (!slug) {
      return res.status(400).json({ success: false, message: 'A valid brand slug is required' });
    }
    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be active or inactive' });
    }

    const allowedLogoTypes = {
      'image/png': '.png',
      'image/jpeg': '.jpg',
      'image/gif': '.gif',
      'image/webp': '.webp'
    };
    if (logo && !allowedLogoTypes[logo.mimetype]) {
      return res.status(400).json({ success: false, message: 'Logo must be a PNG, JPEG, GIF, or WebP image' });
    }
    if (logo && logo.size > 5 * 1024 * 1024) {
      return res.status(400).json({ success: false, message: 'Logo must be 5 MB or smaller' });
    }

    let logoPath;
    let logoFilename;
    try {
      if (logo) {
        const uploadDirectory = path.join(__dirname, '..', 'uploads');
        await fs.promises.mkdir(uploadDirectory, { recursive: true });
        logoFilename = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${allowedLogoTypes[logo.mimetype]}`;
        logoPath = path.join(uploadDirectory, logoFilename);
        await logo.mv(logoPath);
      }

      const data = await db.brands.create({
        name,
        slug,
        logo: logoFilename || null,
        description: description || null,
        status
      });
      return res.status(201).json({ success: true, data });
    } catch (err) {
      if (logoPath) {
        try {
          await fs.promises.unlink(logoPath);
        } catch (cleanupError) {
          if (cleanupError.code !== 'ENOENT') console.error('Unable to remove uploaded brand logo', cleanupError);
        }
      }
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ success: false, message: 'A brand with that name or slug already exists' });
      }
      return sendError(res, err, 'Unable to create brand');
    }
  },

  update: async (req, res) => {
    const resource = resources[req.params.resource];
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Admin resource not found' });
    }

    const changes = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => resource.editable.includes(key))
    );
    if (!Object.keys(changes).length) {
      return res.status(400).json({ success: false, message: 'No editable fields were provided' });
    }
    if (Object.prototype.hasOwnProperty.call(changes, 'status')) {
      const allowedStatuses = resource.model === 'cars'
        ? ['draft', 'active', 'sold', 'archived']
        : resource.model === 'user_reports'
          ? ['pending', 'reviewed', 'resolved', 'rejected']
          : ['active', 'inactive'];
      if (!allowedStatuses.includes(changes.status)) {
        return res.status(400).json({ success: false, message: 'Invalid status value' });
      }
    }
    if (Object.prototype.hasOwnProperty.call(changes, 'is_read')) {
      if (![true, false, 1, 0, '1', '0'].includes(changes.is_read)) {
        return res.status(400).json({ success: false, message: 'Read state must be true or false' });
      }
      changes.is_read = Boolean(Number(changes.is_read));
    }
    if (Object.prototype.hasOwnProperty.call(changes, 'question')) {
      if (typeof changes.question !== 'string' || !changes.question.trim()) {
        return res.status(400).json({ success: false, message: 'Question cannot be empty' });
      }
      changes.question = changes.question.trim();
    }
    if (Object.prototype.hasOwnProperty.call(changes, 'answer')) {
      if (typeof changes.answer !== 'string' || !changes.answer.trim()) {
        return res.status(400).json({ success: false, message: 'Answer cannot be empty' });
      }
      changes.answer = changes.answer.trim();
    }
    if (Object.prototype.hasOwnProperty.call(changes, 'sort_order')) {
      if (!Number.isInteger(Number(changes.sort_order)) || Number(changes.sort_order) < 0) {
        return res.status(400).json({ success: false, message: 'Sort order must be a non-negative integer' });
      }
      changes.sort_order = Number(changes.sort_order);
    }

    try {
      const record = await db[resource.model].findByPk(req.params.id);
      if (!record) {
        return res.status(404).json({ success: false, message: 'Record not found' });
      }
      await record.update(changes);
      return res.status(200).json({ success: true, data: record });
    } catch (err) {
      return sendError(res, err, `Unable to update ${req.params.resource}`);
    }
  },

  remove: async (req, res) => {
    const resource = resources[req.params.resource];
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Admin resource not found' });
    }
    try {
      const removed = await db[resource.model].destroy({ where: { id: req.params.id } });
      if (!removed) {
        return res.status(404).json({ success: false, message: 'Record not found' });
      }
      return res.status(200).json({ success: true, message: 'Record deleted successfully' });
    } catch (err) {
      return sendError(res, err, `Unable to delete ${req.params.resource}`);
    }
  }
};
