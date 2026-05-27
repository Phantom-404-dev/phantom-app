"use client";

import React, { useState } from "react";
import "@/styles/loginpage.css";

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${activeTab} Data:`, formData);
    // Yahan par aage API call hogi
  };

  return (
    <div className="login-wrapper">
      
      {/* Left Side - Image */}
      <div className="left-section">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" 
          alt="Office Workspace" 
          className="left-image" 
        />
        <div className="left-overlay">
          <h2>Welcome to Taskflow</h2>
          <p>Manage your tasks efficiently and effectively.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="right-section">
        <div className="form-container">
          
          <h1 className="form-title">
            {activeTab === "signin" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="form-subtitle">
            {activeTab === "signin" 
              ? "Login to your account" 
              : "Create a new account"}
          </p>

          {/* Tab Switcher */}
          <div className="tab-switcher">
            <button 
              className={`tab-btn ${activeTab === "signin" ? "active" : ""}`}
              onClick={() => setActiveTab("signin")}
              type="button"
            >
              Sign In
            </button>
            <button 
              className={`tab-btn ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => setActiveTab("signup")}
              type="button"
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            
            {/* Name - Sirf Signup me */}
            {activeTab === "signup" && (
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="John Doe"
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            )}

            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="john@example.com"
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Enter your password"
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>

            {/* Confirm Password - Sirf Signup me */}
            {activeTab === "signup" && (
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  placeholder="Confirm your password"
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            )}

            {/* Forgot Password - Sirf Signin me */}
            {activeTab === "signin" && (
              <div className="forgot-password">
                <a href="#">Forgot Password?</a>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              {activeTab === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
};

export default LoginPage;