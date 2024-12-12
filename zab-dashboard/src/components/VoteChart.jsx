import React, { useState, useEffect } from 'react';

const data = [
  { month: 'Jan 22', SemiAnalysis: 2700, PragmaticEngineer: 1800, Hasan: 900 },
  { month: 'Feb 22', SemiAnalysis: 2800, PragmaticEngineer: 1700, Hasan: 1000 },
  { month: 'Mar 22', SemiAnalysis: 3000, PragmaticEngineer: 1900, Hasan: 1200 },
  { month: 'Apr 22', SemiAnalysis: 3200, PragmaticEngineer: 1850, Hasan: 1400 },
  { month: 'May 22', SemiAnalysis: 3400, PragmaticEngineer: 1800, Hasan: 1600 },
  { month: 'Jun 22', SemiAnalysis: 3600, PragmaticEngineer: 1750, Hasan: 1800 },
];

const colors = {
  SemiAnalysis: 'rgb(99, 102, 241)',
  PragmaticEngineer: 'rgb(14, 165, 233)',
  Hasan: 'rgb(239, 68, 68)',
};

export function VotesChart({ isDarkMode = false }) {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(400);

  useEffect(() => {
    const handleResize = () => {
      const chart = document.getElementById('chart-container');
      if (chart) {
        setWidth(chart.offsetWidth);
        setHeight(chart.offsetHeight);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxValue = Math.max(...data.flatMap(d => [d.SemiAnalysis, d.PragmaticEngineer, d.Hasan]));
  const minValue = Math.min(...data.flatMap(d => [d.SemiAnalysis, d.PragmaticEngineer, d.Hasan]));

  const xScale = (index) => (index / (data.length - 1)) * width;
  const yScale = (value) => height - ((value - minValue) / (maxValue - minValue)) * height;

  const makePath = (key) => {
    return data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d[key])}`).join(' ');
  };

  // Define dark mode colors and styles
  const axisColor = isDarkMode ? 'white' : 'black';
  const bgClass = isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
  const textColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className={`p-6 rounded-lg shadow transition-colors duration-300 ${bgClass}`}>
      <h2 className={`text-lg font-semibold mb-4 ${textColor}`}>Votes Scored by Candidates</h2>
      <div id="chart-container" className="w-full h-[400px]">
        <svg width={width} height={height}>
          {Object.entries(colors).map(([key, color]) => (
            <React.Fragment key={key}>
              <path
                d={makePath(key)}
                fill="none"
                stroke={color}
                strokeWidth={2}
              />
              {data.map((d, i) => (
                <circle
                  key={`${key}-${i}`}
                  cx={xScale(i)}
                  cy={yScale(d[key])}
                  r={4}
                  fill={color}
                />
              ))}
            </React.Fragment>
          ))}
          {/* X-axis */}
          <line 
            x1={0} 
            y1={height} 
            x2={width} 
            y2={height} 
            stroke={axisColor} 
            strokeWidth={1.5}
          />
          {/* Y-axis */}
          <line 
            x1={0} 
            y1={0} 
            x2={0} 
            y2={height} 
            stroke={axisColor} 
            strokeWidth={1.5}
          />
          {/* X-axis labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={xScale(i)}
              y={height + 20}
              textAnchor="middle"
              fontSize={12}
              fill={axisColor}
            >
              {d.month}
            </text>
          ))}
          {/* Y-axis labels */}
          {[0, 1000, 2000, 3000, 4000].map((value, i) => (
            <text
              key={i}
              x={-10}
              y={yScale(value)}
              textAnchor="end"
              alignmentBaseline="middle"
              fontSize={12}
              fill={axisColor}
            >
              {value}
            </text>
          ))}
        </svg>
      </div>
      <div className="flex justify-center mt-4">
        {Object.entries(colors).map(([key, color]) => (
          <div key={key} className={`flex items-center mx-2 ${textColor}`}>
            <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: color }} />
            <span className="text-sm">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}