import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Cars() {
     const [cars, setCar] = useState([])

    // const navigate = useNavigate()

    // Get all cars
    const getCars = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5555/getCarsList"
            )

            console.log(response.data)

            setCar(response.data.data)

        } catch (err) {
            console.log(err)
        }
    }


    // Get cars when page loads
    useEffect(() => {
        getCars()
    }, [])





    // Change cars status
    const handleStatusChange = async (id, currentStatus) => {
        try {

            // active -> inactive
            // inactive -> active

            const newStatus = currentStatus === "active" ? 2 : 1

            const response = await axios.put(
                "http://localhost:5555/updateCarStatus",
                {
                    id: id,
                    status: newStatus
                }
            )

            console.log(response.data)

            // Get updated data from database
            if (response.data.success) {
                getCars()
            }

        } catch (err) {
            console.log(err)
        }
    }


    // Delete user
    const handleDelete = async (id) => {
        try {

            const response = await axios.delete(
                "http://localhost:5555/deleteCar",
                {
                    data: {
                        id: id
                    }
                }
            )

            console.log(response.data)

            if (response.data.success) {
                getCars()
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

                        <h1>Cars Listing</h1>

                        <div className="section-header-breadcrumb">

                            <div className="breadcrumb-item active">
                                <Link to="/dashboard">Dashboard</Link>
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

                                                       

                                                        <th>ID</th>

                                                        <th>Car</th>

                                                        <th>VIN</th>

                                                        <th>Vehicle Model</th>

                                                        <th>Price</th>

                                                        <th>Condition</th>

                                                        <th>Fuel</th>

                                                        <th>Transmission</th>
                                                        <th>Description</th>
                                                        <th>Status</th>
                                                        <th>Created At</th>
                                                        
                                                        <th>Actions</th>
                                                        <th>Actions</th>


                                                    </tr>

                                                </thead>


                                                <tbody>

                                                    {cars.map((item, index) => (

                                                        <tr key={item.id}>

                                                           <td>
                                                                {index + 1}
                                                            </td>
                                                            <td>
                                                                {item.vehicle_make}
                                                            </td>


                                                            <td>
                                                                {item.vin}
                                                            </td>

                                                            <td>
                                                                {item.vehicle_model}
                                                            </td>

                                                            <td>
                                                                {item.asking_price}
                                                            </td>

                                                            <td>
                                                                {item.condition}
                                                            </td>


                                                            <td>
                                                                {item.fuel_type}
                                                            </td>


                                                            <td>
                                                                {item.transmission}
                                                            </td>

                                                            <td>
                                                                {item.description}
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
                                                            <td>
                                                        
                                                      
                                                                    <Link
                                                                        to={`/cars/${item.id}`}
                                                                        className="btn btn-primary btn-sm"
                                                                    >
                                                                        View
                                                                    </Link>
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

export default Cars