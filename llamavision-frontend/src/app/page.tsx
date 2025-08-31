"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);
    setResponse("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setResponse(data.description || "No description returned.");
    } catch (err) {
      console.error("❌ Upload failed:", err);
      setResponse("❌ Failed to analyze image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="card">
        <h1>AI Image Analyzer</h1>

        <input type="file" accept="image/*" onChange={handleFileChange} />

        {preview && <img src={preview} alt="Preview" />}

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>

        {response && (
          <div id="ai-response">
            <strong>AI Response:</strong>
            <p>{response}</p>
          </div>
        )}
      </div>
    </main>
  );
}
