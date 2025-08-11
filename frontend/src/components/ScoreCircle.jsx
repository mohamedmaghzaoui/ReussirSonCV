import React from "react";

export default function ScoreCircle({ value }) {
  const score = Math.max(0, Math.min(100, value));

  // Color logic
  let color = "stroke-red-500";
  if (score >= 75) color = "stroke-green-500";
  else if (score >= 50) color = "stroke-yellow-500";

  const radius = 80;
  const circumference = Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="120" viewBox="0 0 200 120">
        {/* Background half circle */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="transparent"
          stroke="#e5e7eb"
          strokeWidth="15"
          strokeLinecap="round"
        />

        {/* Score half circle */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="transparent"
          className={`${color} transition-all duration-500`}
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      {/* Score in the center */}
      <div className="-mt-16 text-center">
        <p className="text-4xl font-bold">{score}%</p>
        <p
          className={`text-lg ${
            score >= 75
              ? "text-green-600"
              : score >= 50
                ? "text-yellow-600"
                : "text-red-600"
          }`}
        >
          {score >= 75 ? "Fort" : score >= 50 ? "Moyen" : "Faible"}
        </p>
      </div>
    </div>
  );
}
