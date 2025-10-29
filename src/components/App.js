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

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData({ ...formData, [id]: value });

    if (id === "name") {
      if (value.trim() === "") {
        setErrors((prev) => ({ ...prev, name: "Name is required" }));
      } else {
        setErrors((prev) => ({ ...prev, name: "" }));
      }
    }

    if (id === "email") {
      const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!emailPattern.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Enter a valid email" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    if (id === "password") {
      if (value.length < 6) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 6 characters",
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.name && !errors.email && !errors.password) {
      alert("Form submitted successfully!");
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <div className="main">
      <form className="form-box" onSubmit={handleSubmit}>
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
