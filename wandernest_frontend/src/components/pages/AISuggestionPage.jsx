/*import React, { useState } from "react";
import { motion } from "framer-motion";

const AISuggestionPage = () => {
  const [formData, setFormData] = useState({
    Budget: "Low",
    Climate: "Temperate",
    Duration: 1,
    Activity: "City Break",
    Season: "Spring",
    Region: "International",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const budgetOptions = ["Low", "Medium", "High"];
  const climateOptions = ["Temperate", "Tropical", "Cold", "Dry"];
  const activityOptions = ["City Break", "Adventure", "Relaxation", "Cultural"];
  const seasonOptions = ["Spring", "Summer", "Autumn", "Winter"];
  const regionOptions = ["International", "Domestic"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "Duration" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("https://travel-api-5uqq.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error ${res.status}: ${text}`);
      }

      const data = await res.json();
      setResult(data);

    } catch (error) {
      console.error("Error fetching AI suggestion:", error);
      setResult({ error: error.message || "Failed to fetch suggestion. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col items-center pt-32 py-12 px-4">
      <h1 className="text-4xl font-extrabold text-white mb-16 drop-shadow-lg text-center">
        AI Travel Suggestion
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-2xl space-y-6"
      >
        {[
          { label: "Budget", type: "select", options: budgetOptions },
          { label: "Climate", type: "select", options: climateOptions },
          { label: "Duration", type: "range", min: 1, max: 30 },
          { label: "Activity", type: "select", options: activityOptions },
          { label: "Season", type: "select", options: seasonOptions },
          { label: "Region", type: "select", options: regionOptions },
        ].map((field) => (
          <div key={field.label}>
            <label className="block font-semibold mb-2 text-gray-700">
              {field.label} {field.type === "range" ? `: ${formData[field.label]}` : ""}
            </label>
            {field.type === "select" ? (
              <select
                name={field.label}
                value={formData[field.label]}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type="range"
                name={field.label}
                min={field.min}
                max={field.max}
                step="1"
                value={formData[field.label]}
                onChange={handleChange}
                className="w-full accent-purple-500"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-bold rounded-xl shadow-lg transform transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105"
          }`}
        >
          {loading ? "Loading..." : "Get Suggestion"}
        </button>
      </form>

      {loading && (
        <p className="mt-6 text-white text-lg font-semibold animate-pulse">
          Loading suggestion...
        </p>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-2xl text-center"
        >
          {result.recommended_destination ? (
            <p className="text-2xl font-bold text-purple-700">
              ✈️ Recommended Destination: {result.recommended_destination}
            </p>
          ) : (
            <pre className="text-red-600">{JSON.stringify(result, null, 2)}</pre>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AISuggestionPage;
*/

import React from "react";
import { motion } from "framer-motion";

const AISuggestionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col items-center pt-32 py-12 px-4">
      <h1 className="text-4xl font-extrabold text-white mb-16 drop-shadow-lg text-center">
        AI Travel Suggestion
      </h1>

      <div className="w-full max-w-2xl h-[700px] rounded-2xl shadow-2xl overflow-hidden">
        <iframe
          src="https://robiulhasanjisan88-travel-recommendation.hf.space/?__theme=light"
          width="100%"
          height="100%"
          frameBorder="0"
          className="rounded-2xl"
          title="AI Travel Recommendation"
        />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 text-white text-lg font-semibold text-center max-w-2xl"
      >
        Use the interactive interface above to get personalized travel destination
        suggestions based on your preferences. Select your Budget, Climate,
        Duration, Activity, Season, and Region to see recommendations instantly.
      </motion.p>
    </div>
  );
};

export default AISuggestionPage;
