import { useState } from "react";
import {
  isAdminEmail,
  isSupabaseConfigured,
  normalizeEmail,
  supabase,
} from "../lib/supabase";

const initialCredentials = {
  email: "",
  password: "",
};

function AdminLogin({ onBackHome, onLoginSuccess, isAuthLoading = false }) {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrorMessage("");
    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isSupabaseConfigured || !supabase) {
      setErrorMessage(
        "Supabase is not configured yet. Add your project URL and publishable key first.",
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const normalizedEmail = normalizeEmail(credentials.email);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: credentials.password,
      });

      if (error) {
        setErrorMessage(error.message || "Incorrect email or password.");
        return;
      }

      if (!isAdminEmail(data.user?.email || "")) {
        await supabase.auth.signOut({ scope: "local" });
        setErrorMessage(
          "This account is not allowed to access the admin dashboard.",
        );
        return;
      }

      setCredentials(initialCredentials);
      onLoginSuccess();
    } catch (error) {
      setErrorMessage(
        error.message || "The Supabase login request could not be completed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="container admin-login-shell">
        <section className="admin-login-card">
          <p className="script-label">Kelsey Login</p>
          <h1>Welcome back, Kelsey.</h1>
          <p className="admin-login-lead">
            Sign in to access the Lazy Bonez admin dashboard, review booking
            requests, and manage upcoming stays.
          </p>

          <form className="admin-login-form" onSubmit={handleSubmit}>
            <label className="admin-login-field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="nmmckee@icloud.com"
                autoComplete="username"
                required
              />
            </label>

            <label className="admin-login-field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </label>

            {errorMessage ? (
              <p className="admin-login-error" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <div className="admin-login-actions">
              <button
                type="submit"
                className="book-btn"
                disabled={isSubmitting || isAuthLoading}
              >
                {isSubmitting || isAuthLoading ? "Signing In..." : "Sign In"}
              </button>
              <button
                type="button"
                className="booking-secondary"
                onClick={onBackHome}
                disabled={isSubmitting}
              >
                Back to Home
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default AdminLogin;
