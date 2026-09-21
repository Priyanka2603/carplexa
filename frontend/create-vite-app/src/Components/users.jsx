import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

function users() {

    const [user, setUser] = useState([])

    // Get all users
    const getUser = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5555/getUserList"
            )

            console.log(response.data)

            setUser(response.data.data)

        } catch (err) {
            console.log(err)
        }
    }


    // Get users when page loads
    useEffect(() => {
        getUser()
    }, [])


    // Change user status
    const handleStatusChange = async (id, currentStatus) => {
        try {

            // active -> inactive
            // inactive -> active

            const newStatus = currentStatus === "active" ? 2 : 1

            const response = await axios.put(
                "http://localhost:5555/updateUserStatus",
                {
                    id: id,
                    status: newStatus
                }
            )

            console.log(response.data)

            // Get updated data from database
            if (response.data.success) {
                getUser()
            }

        } catch (err) {
            console.log(err)
        }
    }


    // Delete user
    const handleDelete = async (id) => {
        try {

            const response = await axios.delete(
                "http://localhost:5555/deleteUser",
                {
                    data: {
                        id: id
                    }
                }
            )

            console.log(response.data)

            if (response.data.success) {
                getUser()
            }

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            {/* Main Content */}

            <div className="main-content">

                <section className="section">

                    <div className="section-header">

                        <h1>Users Listing</h1>

                        <div className="section-header-breadcrumb">

                            <div className="breadcrumb-item active">
                                <a href="#">Dashboard</a>
                            </div>

                            <div className="breadcrumb-item">
                                <a href="#">Modules</a>
                            </div>

                            <div className="breadcrumb-item">
                                List
                            </div>

                        </div>

                    </div>


                    <div className="section-body">

                        <h2 className="section-title">
                            List
                        </h2>


                        <div className="row">

                            <div className="col-12">

                                <div className="card">

                                    <div className="card-body">

                                        <div className="table-responsive">

                                            <table
                                                className="table table-striped"
                                                id="table-1"
                                            >

                                                <thead>

                                                    <tr>

                                                        <th>#</th>

                                                        <th>Name</th>

                                                        <th>Email</th>

                                                        <th>Phone</th>

                                                        <th>Role</th>

                                                        <th>Location</th>

                                                        <th>Status</th>

                                                        <th>Created At</th>

                                                        <th>Action</th>

                                                    </tr>

                                                </thead>


                                                <tbody>

                                                    {user.map((item, index) => (

                                                        <tr key={item.id}>

                                                            <td>
                                                                {index + 1}
                                                            </td>


                                                            <td>
                                                                {item.first_name} {item.last_name}
                                                            </td>


                                                            <td>
                                                                {item.email}
                                                            </td>


                                                            <td>
                                                                {item.phone}
                                                            </td>


                                                            <td>
                                                                {item.role}
                                                            </td>


                                                            <td>
                                                                {item.location}
                                                            </td>


                                                            {/* STATUS */}

                                                            <td>

                                                                <button
                                                                    onClick={() =>
                                                                        handleStatusChange(
                                                                            item.id,
                                                                            item.status
                                                                        )
                                                                    }

                                                                    className={
                                                                        item.status === "active"
                                                                            ? "btn btn-success"
                                                                            : "btn btn-danger"
                                                                    }
                                                                >

                                                                    {item.status === "active"
                                                                        ? "Active"
                                                                        : "Inactive"
                                                                    }

                                                                </button>

                                                            </td>


                                                            <td>
                                                                {item.createdAt}
                                                            </td>


                                                            {/* DELETE */}

                                                            <td>

                                                                <button
                                                                    className="btn btn-danger btn-sm"

                                                                    onClick={() =>
                                                                        handleDelete(item.id)
                                                                    }
                                                                >
                                                                    Delete
                                                                </button>

                                                            </td>

                                                        </tr>

                                                    ))}

                                                </tbody>

                                            </table>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </div>

        </>
    )
}

export default users