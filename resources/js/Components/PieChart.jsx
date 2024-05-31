// src/PieChart.js
import React from "react";

const PieChart = ({ fillPercentage }) => {
    // Calculate the angle of the filled portion of the pie chart
    const fillAngle = (360 * fillPercentage) / 100;
    return (
        <svg viewBox="0 0 24 24" className="w-24 h-24">
            <circle
                cx="12"
                cy="12"
                r="10"
                fill="white"
                // stroke="white"
                // strokeWidth="5"
            />
            <path
                d={`M 12 12 L 12 2 A 10 10 0 ${fillAngle > 180 ? 1 : 0} 1 ${
                    Math.cos(((fillAngle - 90) * Math.PI) / 180) * 10 + 12
                } ${Math.sin(((fillAngle - 90) * Math.PI) / 180) * 10 + 12} Z`}
                fill="#121f30"
            />
            <circle cx="12" cy="12" r="5" fill="#E0C08F" stroke="#E0C08F" />
        </svg>
    );
};

export default PieChart;
