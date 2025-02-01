import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import SuccessPage from "./SuccessPage.js";
import ErrorPage from "./ErrorPage.js"; // Import the error page component
import logo from "./assets/hd-logo.png";
//import dotenv from 'dotenv';
function App() {
    //dotenv.config();
    const [formData, setFormData] = useState({ name: "", email: "", contact: "" });
    const [isSuccess, setIsSuccess] = useState(false);
    const [showSuccessPage, setShowSuccessPage] = useState(false);
    const [showErrorPage, setShowErrorPage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // To store the error message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateName = (name) => {
        // Simple regex for validating Gmail 
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(name);
    };

    const validateEmail = (email) => {
        // Simple regex for validating Gmail 
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return regex.test(email);
    };

    const validateContact = (contact) => {
        // Validates contact: Starts with +91 and is 10 digits
        const regex = /^\d{10}$/;
        return regex.test(contact);
    };

    const checkEmailRegistration = async (email) => {
        try {
            //const apiUrl = `${process.env.API_URL}?email=${email}`;
            // Make the GET request to the proxy path
            const response = await axios.get(`https://example.com?email=${email}`, {
            });

            // Check the response to determine if the email is registered
            if (response.data && response.data.exists===true) {
                return true; // Email is registered
            }
            return false; // Email is not registered
        } catch (error) {
            console.error("Error checking email registration:", error);
            setErrorMessage("Error checking email registration. Please try again.");
            setShowErrorPage(true);
            return false; // In case of error, return false
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform validation checks

        if (!validateName(formData.name)) {
            setErrorMessage("Please enter a valid Name.");
            setShowErrorPage(true);
            return;
        }

        if (!validateEmail(formData.email)) {
            setErrorMessage("Please enter a valid Gmail address.");
            setShowErrorPage(true);
            return;
        }

        if (!validateContact(formData.contact)) {
            setErrorMessage("Please enter a valid contact number with 10 digits.");
            setShowErrorPage(true);
            return;
        }

        const isEmailRegistered = await checkEmailRegistration(formData.email);
        if (!isEmailRegistered) {
            setErrorMessage("It seems this email is either not registered for the course or the course is not yet completed.");
            setShowErrorPage(true);
            return;
        }

        try {
            const response = await axios.post("/api/example.com", formData);

            console.log("Full API Response:", response);

            if (response.data && response.data.payment_link) {
                setIsSuccess(true);
                setShowSuccessPage(true);
            } else {
                console.error("Invalid response structure or missing payment_link");
                setIsSuccess(false);
                setShowErrorPage(true);
                setErrorMessage("API error: Payment link not received.");
            }
        } catch (error) {
            console.error("API request failed:", error);
            setIsSuccess(false);
            setShowErrorPage(true);
            setErrorMessage("API request failed. Please try again.");
        }
    };

    return (
        <div className="app-container">
            {showSuccessPage ? (
                <SuccessPage />
            ) : showErrorPage ? (
                <ErrorPage errorMessage={errorMessage} onRetry={() => setShowErrorPage(false)} />
            ) : (
                <>
                    <img className="logo" src={logo} alt="L4G logo" width="100px" />
                    <form onSubmit={handleSubmit} className="form-container">
                        <h2 className="formTitle">Payment Form</h2>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name for the certificate."
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="abc123@gmail.com"
                            required
                        />

                        <label htmlFor="contact">Contact</label>
                        <div className="contactInfo">
                            <span>
                                +91
                            </span>
                            <input
                                className="contactInput"
                                type="text"
                                id="contact"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="1234567890"
                                maxLength="10" // Restrict to 10 digits
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">Proceed</button>
                    </form>
                </>
            )}
            <div className="footer">
                <div className="footerLinks">
                    <a href="tel:+919939906664">Contact us</a>
                    <a href="#\info@l4g.in">Email</a>
                    <a href="https://www.linkedin.com/company/l4gsolutions/">LinkedIn</a>
                </div>
                <p className="footerCopyright">L4G © 2024. All rights reserved.</p>
            </div>
        </div>
    );
}

export default App;
