"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MoonStar, SunMedium } from "lucide-react";
import "@/styles/loginpage.css";

type AuthMode = "signin" | "signup";
type ThemeMode = "day" | "night";

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [theme, setTheme] = useState<ThemeMode>("day");

  const isSignIn = mode === "signin";
  const isNight = theme === "night";

  return (
    <main className={`login-page ${isNight ? "night-mode" : "day-mode"}`}>
      <section className="login-card">
        <div className="login-left">
          {/* Put your image inside public folder and update src here */}
          <img
            className="login-illustration"
            src="/login-illustration.png"
            alt={isSignIn ? "Sign in illustration" : "Sign up illustration"}
          />
        </div>

        <div className="login-right">
          <ThemeToggle theme={theme} setTheme={setTheme} />

          <div className="form-box">
            {isSignIn ? (
              <SignInSection
                setMode={setMode}
                onSwitch={() => setMode("signup")}
              />
            ) : (
              <SignUpSection
                setMode={setMode}
                onSwitch={() => setMode("signin")}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}) {
  const isNight = theme === "night";

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={isNight ? "Switch to day mode" : "Switch to night mode"}
      onClick={() => setTheme(isNight ? "day" : "night")}
    >
      <span className="theme-label">{isNight ? "Night" : "Day"}</span>

      <span className="theme-track">
        <motion.span
          className="theme-thumb"
          layout
          transition={{ type: "spring", stiffness: 450, damping: 30 }}
        >
          <motion.span
            key={theme}
            initial={{ rotate: -90, scale: 0.45, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {isNight ? (
              <MoonStar className="theme-icon moon-icon" strokeWidth={2.4} />
            ) : (
              <SunMedium className="theme-icon sun-icon" strokeWidth={2.4} />
            )}
          </motion.span>
        </motion.span>
      </span>
    </button>
  );
}

function SignUpSection({
  setMode,
  onSwitch,
}: {
  setMode: (mode: AuthMode) => void;
  onSwitch: () => void;
}) {
  return (
    <div className="auth-section">
      <h1>Sign Up</h1>
      <p className="subtitle">Create your account to get started.</p>

      <AuthTabs active="signup" setMode={setMode} />

      <form>
        <div className="name-row">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />

        <button type="submit" className="primary-btn">
          Register
        </button>
      </form>

      <SocialLogin title="Or Sign Up with" action="Sign up" />

      <p className="switch-text">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch}>
          Sign In
        </button>
      </p>
    </div>
  );
}

function SignInSection({
  setMode,
  onSwitch,
}: {
  setMode: (mode: AuthMode) => void;
  onSwitch: () => void;
}) {
  return (
    <div className="auth-section">
      <h1>Sign In</h1>
      <p className="subtitle">Welcome back! Please login to your account.</p>

      <AuthTabs active="signin" setMode={setMode} />

      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>

          <a href="#" className="forgot-link">
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="primary-btn">
          Sign In
        </button>
      </form>

      <SocialLogin title="Or Sign In with" action="Sign in" />

      <p className="switch-text">
        Don&apos;t have an account?{" "}
        <button type="button" onClick={onSwitch}>
          Sign Up
        </button>
      </p>
    </div>
  );
}

function AuthTabs({
  active,
  setMode,
}: {
  active: AuthMode;
  setMode: (mode: AuthMode) => void;
}) {
  return (
    <div className="auth-tabs">
      <button
        type="button"
        className={active === "signup" ? "active" : ""}
        onClick={() => setMode("signup")}
      >
        Sign Up
      </button>

      <button
        type="button"
        className={active === "signin" ? "active" : ""}
        onClick={() => setMode("signin")}
      >
        Sign In
      </button>
    </div>
  );
}

function SocialLogin({
  title,
  action,
}: {
  title: string;
  action: string;
}) {
  return (
    <>
      <div className="divider">
        <span></span>
        <p>{title}</p>
        <span></span>
      </div>

      <div className="social-buttons">
        <button type="button" className="social-btn">
          <GoogleIcon />
          <span>{action} with Google</span>
        </button>

        <button type="button" className="social-btn">
          <GithubIcon />
          <span>{action} with Github</span>
        </button>

        <button type="button" className="social-btn">
          <MicrosoftIcon />
          <span>{action} with Microsoft</span>
        </button>
      </div>
    </>
  );
}

function GoogleIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.2-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.1 35.1 26.6 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C41 35.5 44 30.6 44 24c0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      className="social-icon github-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 .5A11.5 11.5 0 0 0 8.4 22.9c.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2A11 11 0 0 1 12 6c1 0 2 .1 2.9.4 2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.1c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#F35325" d="M2 2h9.5v9.5H2z" />
      <path fill="#81BC06" d="M12.5 2H22v9.5h-9.5z" />
      <path fill="#05A6F0" d="M2 12.5h9.5V22H2z" />
      <path fill="#FFBA08" d="M12.5 12.5H22V22h-9.5z" />
    </svg>
  );
}
