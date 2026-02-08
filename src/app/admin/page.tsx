"use client";

import { useState } from "react";
import Link from "next/link";
import englishContent from "@/content/english.json";
import tamilContent from "@/content/tamil.json";
import { FiArrowLeft, FiDownload, FiAlertCircle } from "react-icons/fi";

const ADMIN_PASSWORD = "voter-admin-2024";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"en" | "ta">("en");
  const [englishJson, setEnglishJson] = useState(
    JSON.stringify(englishContent, null, 2)
  );
  const [tamilJson, setTamilJson] = useState(
    JSON.stringify(tamilContent, null, 2)
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleDownload = (lang: "en" | "ta") => {
    try {
      const contentStr = lang === "en" ? englishJson : tamilJson;
      JSON.parse(contentStr); // Validate JSON
      const blob = new Blob([contentStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = lang === "en" ? "english.json" : "tamil.json";
      a.click();
      URL.revokeObjectURL(url);
      setError("");
      setSuccess(`${lang === "en" ? "English" : "Tamil"} JSON downloaded successfully!`);
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Invalid JSON format. Please fix errors before downloading.");
      setSuccess("");
    }
  };

  const validateJson = (value: string): boolean => {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  };

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2 text-gray-900">
            Admin Login
          </h1>
          <p className="text-gray-500 mb-6 text-sm">
            Enter the admin password to manage content.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter admin password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
          />
          {error && (
            <p className="text-red-500 mb-4 text-sm flex items-center gap-1">
              <FiAlertCircle /> {error}
            </p>
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-navy text-white p-3 rounded-lg font-medium hover:bg-[#000066] transition-colors"
          >
            Login
          </button>
          <Link
            href="/"
            className="block text-center text-gray-500 hover:text-gray-700 mt-4 text-sm"
          >
            Back to Portal
          </Link>
        </div>
      </div>
    );
  }

  const currentJson = activeTab === "en" ? englishJson : tamilJson;
  const setCurrentJson = activeTab === "en" ? setEnglishJson : setTamilJson;
  const isValid = validateJson(currentJson);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:px-8 md:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Content Manager</h1>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("en")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "en"
              ? "bg-navy text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setActiveTab("ta")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "ta"
              ? "bg-navy text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Tamil
        </button>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              isValid ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-sm text-gray-600">
            {isValid ? "Valid JSON" : "Invalid JSON - fix errors"}
          </span>
        </div>
        <button
          onClick={() => handleDownload(activeTab)}
          disabled={!isValid}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isValid
              ? "bg-green-accent text-white hover:bg-[#0f6e06]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <FiDownload />
          Download {activeTab === "en" ? "english" : "tamil"}.json
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-2 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg mb-2 text-sm">
          {success}
        </div>
      )}

      {/* JSON Editor */}
      <textarea
        value={currentJson}
        onChange={(e) => {
          setCurrentJson(e.target.value);
          setError("");
        }}
        className={`w-full h-[60vh] p-4 font-mono text-sm border-2 rounded-xl focus:outline-none focus:ring-2 ${
          isValid
            ? "border-gray-200 focus:ring-navy focus:border-transparent"
            : "border-red-300 focus:ring-red-500 focus:border-transparent bg-red-50/50"
        }`}
        spellCheck={false}
      />

      <p className="text-xs text-gray-400 mt-2">
        Edit the JSON content above, then download the file. Replace the
        corresponding file in src/content/ and redeploy the application.
      </p>
    </div>
  );
}
