import React, { useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateField = (id, value) => {
    if (id === "name") {
      if (value.trim() === "") return "Name is required";
      return "";
    }

    if (id === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) return "Invalid email format"; 
      return "";
    }

    if (id === "password") {
      if (value.length < 6) return "Password must be at least 6 characters";
      return "";
    }

    return "";
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    const err = validateField(id, value);
    setErrors((prev) => ({ ...prev, [id]: err }));
  };

  const validateAll = () => {
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((msg) => msg !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = validateAll();
    if (!ok) {
      const firstInvalid = Object.keys(errors).find((k) => errors[k]);
      if (firstInvalid) {
        const el = document.getElementById(firstInvalid);
        if (el) el.focus();
      }
      return;
    }

    alert("Form submitted successfully!");
    setFormData({ name: "", email: "", password: "" });
    setErrors({ name: "", email: "", password: "" });
  };

  return (
    <div className="main">
      <form className="form-box" onSubmit={handleSubmit} noValidate>
        <h2>Real-Time Feedback Form</h2>

        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="error-message">{errors.password}</p>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
