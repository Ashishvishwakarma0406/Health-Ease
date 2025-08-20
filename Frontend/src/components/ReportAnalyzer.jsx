import React, { useState } from "react";
import axios from "axios";

function ReportAnalyzer() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleRunAnalyzer = async () => {
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.get("http://localhost:5000/start-analyzer");
            setMessage(response.data.message);
            window.open("http://localhost:5081", "_blank"); // Open Streamlit automatically
        } catch (error) {
            setMessage("❌ Failed to start Report Analyzer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Medical Report Analyzer</h1>
            <button
                onClick={handleRunAnalyzer}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg"
                disabled={loading}
            >
                {loading ? "Starting..." : "Start Report Analyzer"}
            </button>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}

export default ReportAnalyzer;