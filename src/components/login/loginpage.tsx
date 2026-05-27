"use client";

import React, { useState } from "react";
import "@/styles/loginpage.css";

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Error hatayo jab user type kare
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (activeTab === "signup" && !formData.name.trim()) {
      newErrors.name = "Naam daalna zaroori hai";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email daalna zaroori hai";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Sahi email daalo";
    }

    if (!formData.password) {
      newErrors.password = "Password daalna zaroori hai";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password kam se kam 6 characters ka hona chahiye";
    }

    if (activeTab === "signup") {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Password dobara daalo";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Dono password match nahi kar rahe";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsLoading(false);

    const action = activeTab === "signin" ? "Sign In" : "Sign Up";
    alert(`${action} successful! (Demo)`);
  };

  // Tab switch pe form reset
  const switchTab = (tab: "signin" | "signup") => {
    setActiveTab(tab);
    setErrors({});
    setShowPassword(false);
  };

  return (
    <div className="login-wrapper">
      {/* Animated Background Elements */}
      <div className="bg-layer">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        <div className="bg-grid" />
        <div className="bg-noise" />
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              opacity: 0.2 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="login-card">
        {/* Brand Header */}
        <div className="card-header">
          <div className="brand-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="36" height="36" rx="10" stroke="currentColor" strokeWidth="2.5" />
              <path d="M14 20L18 24L26 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="brand-title">Taskflow</h1>
          <p className="brand-subtitle">
            {activeTab === "signin"
              ? "Wapas swagat hai! Apna account access karo"
              : "Naya account banao aur shuru karo"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="tab-switcher">
          <button
            className={`tab-btn ${activeTab === "signin" ? "tab-active" : ""}`}
            onClick={() => switchTab("signin")}
            type="button"
          >
            <span className="tab-text">Sign In</span>
            {activeTab === "signin" && <span className="tab-indicator" />}
          </button>
          <button
            className={`tab-btn ${activeTab === "signup" ? "tab-active" : ""}`}
            onClick={() => switchTab("signup")}
            type="button"
          >
            <span className="tab-text">Sign Up</span>
            {activeTab === "signup" && <span className="tab-indicator" />}
          </button>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Name Field - Sirf Signup me */}
          <div className={`field-group ${activeTab === "signup" ? "field-visible" : "field-hidden"}`}>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                name="name"
                placeholder="Aapka naam"
                value={formData.name}
                onChange={handleChange}
                className={`login-input ${errors.name ? "input-error" : ""}`}
                autoComplete="name"
              />
            </div>
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="field-group field-visible">
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13L2 4" />
              </svg>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={`login-input ${errors.email ? "input-error" : ""}`}
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="field-group field-visible">
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`login-input ${errors.password ? "input-error" : ""}`}
                autoComplete={activeTab === "signin" ? "current-password" : "new-password"}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Password chupao" : "Password dikhao"}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          {/* Confirm Password - Sirf Signup me */}
          <div className={`field-group ${activeTab === "signup" ? "field-visible" : "field-hidden"}`}>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Password dobara daalo"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`login-input ${errors.confirmPassword ? "input-error" : ""}`}
                autoComplete="new-password"
              />
            </div>
            {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
          </div>

          {/* Forgot Password - Sirf Signin me */}
          {activeTab === "signin" && (
            <div className="forgot-row">
              <label className="remember-me">
                <input type="checkbox" />
                <span className="checkmark" />
                <span>Yaad rakho</span>
              </label>
              <button type="button" className="forgot-link">
                Password bhul gaye?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <span className="btn-loader">
                <svg className="spinner" viewBox="0 0 24 24">
                  <circle className="spinner-track" cx="12" cy="12" r="10" />
                  <circle className="spinner-head" cx="12" cy="12" r="10" />
                </svg>
                <span>Processing...</span>
              </span>
            ) : (
              <span>{activeTab === "signin" ? "Sign In" : "Account Banao"}</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span className="divider-line" />
          <span className="divider-text">ya</span>
          <span className="divider-line" />
        </div>

        {/* Social Login */}
        <div className="social-row">
          <button type="button" className="social-btn" aria-label="Google se sign in karo">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Google</span>
          </button>
          <button type="button" className="social-btn" aria-label="GitHub se sign in karo">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </button>
          <button type="button" className="social-btn" aria-label="X se sign in karo">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>X</span>
          </button>
        </div>

        {/* Footer */}
        <p className="card-footer">
          {activeTab === "signin" ? (
            <>
              Account nahi hai?{" "}
              <button type="button" className="switch-link" onClick={() => switchTab("signup")}>
                Sign Up karo
              </button>
            </>
          ) : (
            <>
              Pehle se account hai?{" "}
              <button type="button" className="switch-link" onClick={() => switchTab("signin")}>
                Sign In karo
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;