const jwt = require('jsonwebtoken');
const db = require('../models');

module.exports = async function adminAuth(req, res, next) {
  const authorization = req.get('authorization') || '';
  const [scheme, token] = authorization.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ success: false, message: 'Administrator sign-in is required' });
  }
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET must be configured before admin requests can be authenticated');
    return res.status(500).json({ success: false, message: 'Server authentication is not configured' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof payload === 'string' || payload.role !== 'admin' || !payload.id) {
      return res.status(403).json({ success: false, message: 'Administrator access is required' });
    }
    const administrator = await db.users.findOne({
      where: { id: payload.id, role: 'admin', status: 'active' },
      attributes: ['id']
    });
    if (!administrator) {
      return res.status(403).json({ success: false, message: 'Administrator access is required' });
    }
    req.adminId = administrator.id;
    return next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Administrator sign-in has expired' });
    }
    console.error('Unable to authenticate admin request', err);
    return res.status(500).json({ success: false, message: 'Unable to authenticate admin request' });
  }
};
