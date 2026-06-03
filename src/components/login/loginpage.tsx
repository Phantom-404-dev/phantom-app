"use client";

import { useState, type FC, type FormEvent } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import {
  Mail,
  Lock,
  User,
  AtSign,
  Check,
  Eye,
  EyeOff,
  X,
  ArrowRight,
} from "lucide-react";
import "@/styles/loginpage.css";

type Mode = "signin" | "signup";

/* ===== SVG Brand Icons ===== */
const GoogleIcon: FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const GitHubIcon: FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const MicrosoftIcon: FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="1" y="1" width="10" height="10" fill="#F25022" />
    <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
    <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
    <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
  </svg>
);

const LoginPage: FC = () => {
  const [mode, setMode] = useState<Mode>("signin");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Sign In state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Sign Up state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [username, setUsername] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SIGN IN:", { email, password, rememberMe });
  };

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SIGN UP:", { firstName, lastName, signupEmail, username });
  };

  const handleForgotPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Forgot password clicked");
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Continue with ${provider}`);
    setSignupEmail(`Logged in via ${provider}`); 
    setIsModalOpen(false);
  };

  const handleModeSwitch = () => {
    setMode((prev) => (prev === "signin" ? "signup" : "signin"));
    setFocusedField(null);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.07, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const titleRevealVariants: Variants = {
    hidden: { 
      clipPath: "inset(0 100% 0 0)",
      opacity: 0
    },
    visible: { 
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      transition: { 
        clipPath: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.3 }
      } 
    },
    exit: { 
      clipPath: "inset(0 0 0 100%)",
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, delay: 0.15, ease: "easeOut" } 
    },
    exit: { opacity: 0, y: -4, transition: { duration: 0.2 } }
  };

  const descVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, delay: 0.25, ease: "easeOut" } 
    },
    exit: { opacity: 0, y: -4, transition: { duration: 0.2 } }
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.06, delayChildren: 0.05 },
    },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <div className="login-bg">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      {/* ===== Provider Popup Modal ===== */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="modal-container"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-image-wrap">
                <Image src="/imgs/img.jpeg" alt="image" fill priority className="modal-image" />
              </div>

              <div className="modal-content">
                <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                  <X size={18} />
                </button>

                <h2 className="modal-title">Choose a Provider</h2>
                <p className="modal-subtitle">Select any one to get started with your Email</p>

                <div className="modal-buttons">
                  <motion.button whileTap={{ scale: 0.97 }} className="social-btn" onClick={() => handleSocialLogin("Google")}>
                    <GoogleIcon size={20} />
                    <span>Continue with Google</span>
                  </motion.button>

                  <motion.button whileTap={{ scale: 0.97 }} className="social-btn" onClick={() => handleSocialLogin("GitHub")}>
                    <GitHubIcon size={20} />
                    <span>Continue with GitHub</span>
                  </motion.button>

                  <motion.button whileTap={{ scale: 0.97 }} className="social-btn" onClick={() => handleSocialLogin("Microsoft")}>
                    <MicrosoftIcon size={20} />
                    <span>Continue with Microsoft</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="login-wrapper" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="glass-card" variants={itemVariants}>
          <div className="page-title-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${mode}-title-block`}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
              >
                <motion.h1 
                  className="page-title" 
                  variants={titleRevealVariants}
                >
                  {mode === "signin" ? "Sign In" : "Sign Up"}
                </motion.h1>
                
                <motion.span 
                  className="page-subtitle" 
                  variants={subtitleVariants}
                >
                  {mode === "signin" ? "Welcome Back" : "Create Your Account"}
                </motion.span>
                
                <motion.p 
                  className="page-description" 
                  variants={descVariants}
                >
                  {mode === "signin"
                    ? "Glad to see you again. Enter your details below to continue your journey with us."
                    : "Fill in your details to create an account and start your journey with us."}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {mode === "signin" ? (
              <motion.form key="signin-form" onSubmit={handleSignIn} className="login-form" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                <motion.div className={`input-group ${focusedField === "email" ? "focused" : ""}`} variants={itemVariants}>
                  <div className="input-row">
                    <Mail className="input-icon" strokeWidth={2} />
                    <input type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} className="login-input" autoComplete="email" required />
                  </div>
                  <div className="input-underline" />
                </motion.div>

                <motion.div className={`input-group ${focusedField === "password" ? "focused" : ""}`} variants={itemVariants}>
                  <div className="input-row">
                    <Lock className="input-icon" strokeWidth={2} />
                    <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)} className="login-input" autoComplete="current-password" required />
                    <button type="button" className="eye-toggle" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Hide password" : "Show password"}>
                      {showPassword ? <EyeOff className="eye-icon" strokeWidth={2} /> : <Eye className="eye-icon" strokeWidth={2} />}
                    </button>
                  </div>
                  <div className="input-underline" />
                </motion.div>

                <motion.div className="options-row" variants={itemVariants}>
                  <label className="remember-me">
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    <span className="checkmark">{rememberMe && <Check className="check-icon" strokeWidth={3} />}</span>
                    <span className="remember-text">Remember me</span>
                  </label>
                  <button type="button" className="forgot-link" onClick={handleForgotPassword}>Forgot Password?</button>
                </motion.div>

                <motion.button type="submit" className="blob-btn" variants={itemVariants} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <span className="blob-btn__label">LOGIN</span>
                </motion.button>

                <motion.p className="form-helper" variants={itemVariants}>
                  New here? <span className="form-helper-accent">Tap REGISTER below to create your account</span>
                </motion.p>
              </motion.form>
            ) : (
              <motion.form key="signup-form" onSubmit={handleSignUp} className="login-form" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                <motion.div className={`input-group ${focusedField === "firstName" ? "focused" : ""}`} variants={itemVariants}>
                  <div className="input-row">
                    <User className="input-icon" strokeWidth={2} />
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} onFocus={() => setFocusedField("firstName")} onBlur={() => setFocusedField(null)} className="login-input" autoComplete="given-name" required />
                  </div>
                  <div className="input-underline" />
                </motion.div>

                <motion.div className={`input-group ${focusedField === "lastName" ? "focused" : ""}`} variants={itemVariants}>
                  <div className="input-row">
                    <User className="input-icon" strokeWidth={2} />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} onFocus={() => setFocusedField("lastName")} onBlur={() => setFocusedField(null)} className="login-input" autoComplete="family-name" required />
                  </div>
                  <div className="input-underline" />
                </motion.div>

                <motion.div className="input-group" variants={itemVariants}>
                  <div className="input-row email-trigger" onClick={() => setIsModalOpen(true)}>
                    <Mail className="input-icon" strokeWidth={2} />
                    <span className={`login-input ${signupEmail ? '' : 'placeholder-style'}`}>
                      {signupEmail || "Continue with Email"}
                    </span>
                  </div>
                  <div className="input-underline" />
                </motion.div>

                <motion.div className={`input-group ${focusedField === "username" ? "focused" : ""}`} variants={itemVariants}>
                  <div className="input-row">
                    <AtSign className="input-icon" strokeWidth={2} />
                    <input type="text" placeholder="Username (optional)" value={username} onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))} onFocus={() => setFocusedField("username")} onBlur={() => setFocusedField(null)} className="login-input" autoComplete="username" />
                  </div>
                  <div className="input-underline" />
                </motion.div>

                <motion.button type="submit" className="blob-btn" variants={itemVariants} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <span className="blob-btn__label">CONTINUE</span>
                </motion.button>

                <motion.p className="form-helper" variants={itemVariants}>
                  Already have an account? <span className="form-helper-accent">Tap SIGN IN below to continue</span>
                </motion.p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ===== BOTTOM CARD - Shine Sweep + Blur Morph ===== */}
        <motion.div
          className="register-card"
          variants={itemVariants}
          onClick={handleModeSwitch}
          role="button"
          tabIndex={0}
          whileTap={{ scale: 0.96 }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleModeSwitch();
            }
          }}
        >
          {/* Shine Sweep Effect */}
          <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
            key={`sweep-${mode}`}
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 20%, rgba(95, 212, 232, 0.6) 50%, rgba(255, 255, 255, 0.1) 80%, transparent 100%)",
            }}
          />

          <span className="register-btn">
            <AnimatePresence mode="wait">
              <motion.span
                key={`${mode}-switch-text`}
                className="register-btn-text"
                initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)", y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {mode === "signin" ? "REGISTER" : "SIGN IN"}
              </motion.span>
            </AnimatePresence>
            
            <motion.div
              key={`${mode}-icon`}
              initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
              transition={{ duration: 0.3, delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
            >
              <ArrowRight size={18} className="text-white/90" />
            </motion.div>
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;