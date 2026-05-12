import { useState } from "react";

function App() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch("https://ai-resume-analyzer-cdsk.onrender.com/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setResult(data);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fb",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#333" }}>
          AI Resume Analyzer
        </h1>

        <p style={{ textAlign: "center", color: "gray" }}>
          Upload your resume and get ATS analysis instantly
        </p>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <input type="file" onChange={handleFileChange} />
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={handleUpload}
            style={{
              padding: "12px 25px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Analyze Resume
          </button>
        </div>

        {result && (
          <div style={{ marginTop: "40px" }}>

            <h2 style={{ color: "#222" }}>
              ATS Score: {result.ats_score}/100
            </h2>

            <div
              style={{
                width: "100%",
                backgroundColor: "#ddd",
                borderRadius: "10px",
                overflow: "hidden",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: `${result.ats_score}%`,
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "10px",
                }}
              >
                {result.ats_score}%
              </div>
            </div>

            <h3>Skills Found</h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {result.skills_found.map((skill, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "8px 15px",
                    borderRadius: "20px",
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;