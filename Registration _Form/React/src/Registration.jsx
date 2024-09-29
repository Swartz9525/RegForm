import React, { useState } from "react";

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
  });
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(""); // For success message

  // Reset form fields after successful submission
  const resetForm = () => {
    setFormData({
      fullName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      gender: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST", // Correct POST URL
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send formData as JSON
      });

      if (!response.ok) {
        const errMessage = await response.json();
        throw new Error(errMessage.message || "Failed to submit data");
      }

      const result = await response.json();
      console.log(result); // Optionally log or use the returned data

      // Display success message and reset form
      setSuccess("Form submitted successfully!");
      resetForm();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#e0f7fa",
      fontFamily: "'Roboto', sans-serif",
    },
    form: {
      backgroundColor: "#ffffff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
      boxSizing: "border-box",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "16px",
      boxSizing: "border-box",
      transition: "border-color 0.3s ease",
    },
    select: {
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "16px",
      boxSizing: "border-box",
      transition: "border-color 0.3s ease",
    },
    button: {
      backgroundColor: isHovered ? "#004d40" : "#00796b",
      color: "white",
      padding: "12px",
      width: "100%",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    formTitle: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#00796b",
      fontSize: "24px",
      fontWeight: "bold",
    },
    label: {
      marginBottom: "8px",
      display: "block",
      color: "#333",
      fontSize: "14px",
      fontWeight: "bold",
    },
    error: {
      color: "red",
      textAlign: "center",
      marginBottom: "20px",
    },
    success: {
      color: "green",
      textAlign: "center",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.formTitle}>Registration Form</h2>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        <label htmlFor="fullName" style={styles.label}>
          Full Name:
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          style={styles.input}
        />
        <label htmlFor="lastName" style={styles.label}>
          Last Name:
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          required
          style={styles.input}
        />
        <label htmlFor="email" style={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          style={styles.input}
        />
        <label htmlFor="password" style={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          style={styles.input}
        />
        <label htmlFor="phoneNumber" style={styles.label}>
          Phone Number:
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
          style={styles.input}
        />
        <label htmlFor="gender" style={styles.label}>
          Gender:
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          style={styles.select}
        >
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="submit"
          value={loading ? "Submitting..." : "Register"}
          style={styles.button}
          disabled={loading}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </form>
    </div>
  );
};

export default Registration;
