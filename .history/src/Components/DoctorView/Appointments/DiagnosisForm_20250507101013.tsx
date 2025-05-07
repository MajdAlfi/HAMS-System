import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../../../Services/Others/baseURL";

export const DiagnosisForm = () => {
  const { aptId } = useParams(); // URL should be /diagnosis/:aptId
  const [diagnosis, setDiagnosis] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const wordCount = diagnosis.trim().split(/\s+/).length;

  const handleSubmit = async () => {
    if (wordCount > 100) {
      setError("Diagnosis cannot exceed 100 words.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("User") || "{}");
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${baseURL}/updateDiagnosis/${aptId}`, {
        method: "PATCH",
        headers: {
          uid: user.id,
          token: token || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ diagnosis }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      alert("Diagnosis updated successfully.");
      navigate("/dochome"); // redirect back
    } catch (err: unknown) {
      setError("Error: " + err);
    }
  };

  return (
    <div
      style={{
        width: "60vw",
        margin: "10vh auto",
        marginLeft: "17vw",
        padding: "2rem",
        backgroundColor: "white",
        borderRadius: "20px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Update Diagnosis</h2>
      <textarea
        value={diagnosis}
        onChange={(e) => {
          setDiagnosis(e.target.value);
          setError("");
        }}
        placeholder="Enter diagnosis (max 100 words)"
        rows={10}
        style={{
          width: "100%",
          padding: "1rem",
          fontSize: "16px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          resize: "none",
        }}
      />
      <p style={{ textAlign: "right", fontSize: "14px" }}>
        Word Count: {wordCount}/100
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "1rem",
          padding: "10px 20px",
          backgroundColor: "rgba(0, 164, 201, 0.85)",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Update
      </button>
    </div>
  );
};
