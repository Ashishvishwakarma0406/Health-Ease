import React, { useState } from "react";
import axios from "axios";

const ReportAnalyzer = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
    const STREAMLIT_URL = import.meta.env.VITE_STREAMLIT_URL || "http://localhost:5081";

    const handleRunAnalyzer = async () => {
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.get(`${API_BASE_URL}/start-analyzer`);
            setMessage(response.data.message || "Analyzer started successfully.");
            
            // Delay opening Streamlit slightly (backend needs time to boot)
            setTimeout(() => {
                window.open(STREAMLIT_URL, "_blank");
            }, 2000);
        } catch (error) {
            console.error("Error starting analyzer:", error);
            setMessage("Failed to start Report Analyzer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Medical Report Analyzer</h1>
            <button
                onClick={handleRunAnalyzer}
                className={`px-6 py-3 rounded-lg font-medium transition duration-200 ${
                    loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                disabled={loading}
            >
                {loading ? "Starting Analyzer..." : "Start Report Analyzer"}
            </button>
            {message && (
                <p className="mt-4 text-center text-gray-700">
                    {message}
                </p>
            )}
        </div>
    );
};

export default ReportAnalyzer;
