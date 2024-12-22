// SuccessPage.js
import React from "react";
import "./SuccessPage.css";
import logo from "./assets/hd-logo.png";

function SuccessPage() {
    return (
        <div className="success-page-container">
            <img className="logo" src={logo} alt="L4G logo" width="100px" />
            <h1>A payment link has been sent to your email and phone.</h1>
            <p>Please check your inbox to complete the transaction.</p>

        </div>
    );
}

export default SuccessPage;
