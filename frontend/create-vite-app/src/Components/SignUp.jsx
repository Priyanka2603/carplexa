import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {

    const [user, setUser] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone: "",
        role: "user",
        dealership_name: "",
        business_registration_number: "",
        location: "",
        latitude: "",
        longitude: "",
        about: ""
    });

    const [profileImage, setProfileImage] = useState(null);

    const navigate = useNavigate();
  

const handleLogin = () => {
    navigate("/login");
};

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };
    

    const handleSignup = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("email", user.email);
            formData.append("password", user.password);
            formData.append("first_name", user.first_name);
            formData.append("last_name", user.last_name);
            formData.append("phone", user.phone);
            formData.append("role", user.role);
            formData.append("dealership_name", user.dealership_name);
            formData.append("business_registration_number", user.business_registration_number);
            formData.append("location", user.location);
            formData.append("latitude", user.latitude);
            formData.append("longitude", user.longitude);
            formData.append("profile_image", profileImage)
            formData.append("about", user.about);

            // if (profileImage) {
            //     formData.append("profile_image", profileImage);
            // }

        
            const response = await axios.post("http://localhost:5555/signUp",formData);

            console.log(response.data);

            if (response.data.success) {
                alert("Signup successful");

                // You can navigate to login here
                // navigate("/login");
            }

        } catch (err) {

            console.log(err);

            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert("Something went wrong");
            }
        }
    };


    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <h2 className="mb-4">
                        Create Account
                    </h2>

                    <form onSubmit={handleSignup}>

                        {/* First Name */}
                        <div className="mb-3">
                            <label>First Name</label>

                            <input
                                type="text"
                                name="first_name"
                                className="form-control"
                                value={user.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        {/* Last Name */}
                        <div className="mb-3">
                            <label>Last Name</label>

                            <input
                                type="text"
                                name="last_name"
                                className="form-control"
                                value={user.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        {/* Email */}
                        <div className="mb-3">
                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        {/* Password */}
                        <div className="mb-3">
                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={user.password}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        {/* Phone */}
                        <div className="mb-3">
                            <label>Phone</label>

                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                value={user.phone}
                                onChange={handleChange}
                            />
                        </div>


                        {/* Role */}
                        <div className="mb-3">

                            <label>Account Type</label>

                            <select
                                name="role"
                                className="form-control"
                                value={user.role}
                                onChange={handleChange}
                            >
                                <option value="user">
                                    User
                                </option>

                                <option value="dealer">
                                    Dealer
                                </option>
                            </select>

                        </div>


                        {/* Dealership Name */}
                        {user.role === "dealer" && (
                            <>
                                <div className="mb-3">

                                    <label>
                                        Dealership Name
                                    </label>

                                    <input
                                        type="text"
                                        name="dealership_name"
                                        className="form-control"
                                        value={user.dealership_name}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* Business Registration */}
                                <div className="mb-3">

                                    <label>
                                        Business Registration Number
                                    </label>

                                    <input
                                        type="text"
                                        name="business_registration_number"
                                        className="form-control"
                                        value={
                                            user.business_registration_number
                                        }
                                        onChange={handleChange}
                                    />

                                </div>
                            </>
                        )}


                        {/* Profile Image */}
                        <div className="mb-3">

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


                        {/* Location */}
                        <div className="mb-3">

                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                className="form-control"
                                value={user.location}
                                onChange={handleChange}
                            />

                        </div>


                        {/* Latitude */}
                        <div className="mb-3">

                            <label>
                                Latitude
                            </label>

                            <input
                                type="text"
                                name="latitude"
                                className="form-control"
                                value={user.latitude}
                                onChange={handleChange}
                            />

                        </div>


                        {/* Longitude */}
                        <div className="mb-3">

                            <label>
                                Longitude
                            </label>

                            <input
                                type="text"
                                name="longitude"
                                className="form-control"
                                value={user.longitude}
                                onChange={handleChange}
                            />

                        </div>


                        {/* About */}
                        <div className="mb-3">

                            <label>
                                About
                            </label>

                            <textarea
                                name="about"
                                className="form-control"
                                rows="4"
                                value={user.about}
                                onChange={handleChange}
                            />

                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Sign Up
                        </button>
                    <p className="text-center">OR</p>
                        <button
    type="button"
    className="btn btn-primary w-100"
    onClick={handleLogin}
>
    Login
</button>
                        
                    
                       

                    </form>

                </div> 

            </div>

        </div>
    );
}

export default SignUp;