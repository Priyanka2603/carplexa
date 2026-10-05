import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile() {

    // Get ID from URL
    // Example: /profile/9
    // id = 9
    const { id } = useParams();

    // Get logged-in user from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));

    console.log("User from localStorage:", userData);

    const [user, setUser] = useState({});
    const [image, setImage] = useState(null);


    // ==============================
    // GET USER PROFILE
    // ==============================

    const getProfile = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5555/getUserProfile",
                {
                    params: {
                        id: id
                    }
                }
            );

            console.log("Profile response:", response.data);

            if (response.data.success) {

                setUser(response.data.user);

            }

        } catch (err) {

            console.log("Error getting profile:", err);

        }

    };


    // ==============================
    // GET PROFILE WHEN PAGE LOADS
    // ==============================

    useEffect(() => {

        if (id) {
            getProfile();
        }

    }, [id]);


    // ==============================
    // HANDLE INPUT CHANGE
    // ==============================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });

    };


    // ==============================
    // HANDLE IMAGE CHANGE
    // ==============================

    const handleImageChange = (e) => {

        const selectedImage = e.target.files[0];

        if (selectedImage) {

            setImage(selectedImage);

        }

    };


    // ==============================
    // UPDATE PROFILE
    // ==============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("id", id);
            formData.append("first_name", user.first_name || "");
            formData.append("last_name", user.last_name || "");
            formData.append("email", user.email || "");
            formData.append("phone", user.phone || "");
            formData.append("location", user.location || "");
            formData.append("about", user.about || "");

            // Only send image if user selected a new one
            if (image) {

                formData.append("profile_image", image);

            }


            const response = await axios.put(
                "http://localhost:5555/editProfile",
                formData
            );


            console.log("Update response:", response.data);


            if (response.data.success) {

                alert("Profile updated successfully");

                // Get updated profile
                getProfile();

                // Remove selected image from state
                setImage(null);

            } else {

                alert(response.data.message);

            }


        } catch (err) {

            console.log("Error updating profile:", err);

            alert("Something went wrong while updating profile");

        }

    };


    return (

        <>

            <div className="main-content">

                <section className="section">


                    {/* ==============================
                        PAGE HEADER
                    ============================== */}

                    <div className="section-header">

                        <h1>Profile</h1>

                        <div className="section-header-breadcrumb">

                            <div className="breadcrumb-item active">

                                <a href="#">
                                    Dashboard
                                </a>

                            </div>

                            <div className="breadcrumb-item">

                                Profile

                            </div>

                        </div>

                    </div>


                    {/* ==============================
                        PAGE BODY
                    ============================== */}

                    <div className="section-body">

                        <h2 className="section-title">

                            {user.first_name || ""}{" "}

                            {user.last_name || ""}

                        </h2>


                        <p className="section-lead">

                            View and edit user information.

                        </p>


                        <div className="row mt-sm-4">


                            {/* ==========================================
                                LEFT SIDE - USER PROFILE
                            ========================================== */}

                            <div className="col-12 col-md-12 col-lg-5">

                                <div className="card profile-widget">


                                    {/* PROFILE IMAGE */}

                                    <div className="profile-widget-header">

                                        <img
                                            alt="profile"
                                            src={
                                                user.profile_image
                                                    ? `http://localhost:5555/uploads/${user.profile_image}`
                                                    : "../assets/img/avatar/avatar-1.png"
                                            }
                                            className="rounded-circle profile-widget-picture"
                                        />

                                    </div>


                                    {/* USER INFORMATION */}

                                    <div className="profile-widget-description">


                                        {/* NAME */}

                                        <div className="profile-widget-name">

                                            {user.first_name || ""}{" "}

                                            {user.last_name || ""}


                                            <div className="text-muted d-inline font-weight-normal">

                                                <div className="slash" />

                                                {user.role || "User"}

                                            </div>

                                        </div>


                                        {/* EMAIL */}

                                        <p>

                                            <strong>
                                                Email:
                                            </strong>{" "}

                                            {user.email || "-"}

                                        </p>


                                        {/* PHONE */}

                                        <p>

                                            <strong>
                                                Phone:
                                            </strong>{" "}

                                            {user.phone || "-"}

                                        </p>


                                        {/* LOCATION */}

                                        <p>

                                            <strong>
                                                Location:
                                            </strong>{" "}

                                            {user.location || "-"}

                                        </p>


                                        {/* STATUS */}

                                        <p>

                                            <strong>
                                                Status:
                                            </strong>{" "}


                                            <span
                                                className={
                                                    user.status === "active"
                                                        ? "badge badge-success"
                                                        : "badge badge-danger"
                                                }
                                            >

                                                {user.status || "-"}

                                            </span>

                                        </p>


                                        {/* ROLE */}

                                        <p>

                                            <strong>
                                                Role:
                                            </strong>{" "}

                                            {user.role || "-"}

                                        </p>


                                        {/* ABOUT */}

                                        <p>

                                            <strong>
                                                About:
                                            </strong>

                                        </p>


                                        <p>

                                            {user.about ||
                                                "No information available"}

                                        </p>


                                    </div>

                                </div>

                            </div>



                            {/* ==========================================
                                RIGHT SIDE - EDIT PROFILE
                            ========================================== */}

                            <div className="col-12 col-md-12 col-lg-7">

                                <div className="card">


                                    <form onSubmit={handleSubmit}>


                                        {/* FORM HEADER */}

                                        <div className="card-header">

                                            <h4>
                                                Edit Profile
                                            </h4>

                                        </div>


                                        <div className="card-body">


                                            {/* =================================
                                                PROFILE IMAGE
                                            ================================= */}

                                            <div className="form-group">

                                                <label>
                                                    Profile Image
                                                </label>

                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />

                                            </div>


                                            {/* =================================
                                                FIRST NAME + LAST NAME
                                            ================================= */}

                                            <div className="row">


                                                <div className="form-group col-md-6 col-12">

                                                    <label>
                                                        First Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        name="first_name"
                                                        className="form-control"
                                                        value={
                                                            user.first_name || ""
                                                        }
                                                        onChange={handleChange}
                                                    />

                                                </div>


                                                <div className="form-group col-md-6 col-12">

                                                    <label>
                                                        Last Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        name="last_name"
                                                        className="form-control"
                                                        value={
                                                            user.last_name || ""
                                                        }
                                                        onChange={handleChange}
                                                    />

                                                </div>

                                            </div>



                                            {/* =================================
                                                EMAIL + PHONE
                                            ================================= */}

                                            <div className="row">


                                                <div className="form-group col-md-7 col-12">

                                                    <label>
                                                        Email
                                                    </label>

                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        value={
                                                            user.email || ""
                                                        }
                                                        onChange={handleChange}
                                                    />

                                                </div>


                                                <div className="form-group col-md-5 col-12">

                                                    <label>
                                                        Phone
                                                    </label>

                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        className="form-control"
                                                        value={
                                                            user.phone || ""
                                                        }
                                                        onChange={handleChange}
                                                    />

                                                </div>

                                            </div>



                                            {/* =================================
                                                LOCATION
                                            ================================= */}

                                            <div className="row">

                                                <div className="form-group col-12">

                                                    <label>
                                                        Location
                                                    </label>

                                                    <input
                                                        type="text"
                                                        name="location"
                                                        className="form-control"
                                                        value={
                                                            user.location || ""
                                                        }
                                                        onChange={handleChange}
                                                    />

                                                </div>

                                            </div>



                                            {/* =================================
                                                ABOUT
                                            ================================= */}

                                            <div className="row">

                                                <div className="form-group col-12">

                                                    <label>
                                                        About
                                                    </label>

                                                    <textarea
                                                        name="about"
                                                        className="form-control"
                                                        rows="5"
                                                        value={
                                                            user.about || ""
                                                        }
                                                        onChange={handleChange}
                                                    />

                                                </div>

                                            </div>


                                        </div>



                                        {/* =================================
                                            SAVE BUTTON
                                        ================================= */}

                                        <div className="card-footer text-right">

                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >

                                                Save Changes

                                            </button>

                                        </div>


                                    </form>

                                </div>

                            </div>


                        </div>

                    </div>

                </section>

            </div>

        </>

    );

}

export default Profile;