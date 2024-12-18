interface CircularBorderProps {
    progress: number; // Progress percentage (0-100+)
    display: string;
    size?: number; // Size of the circular border in pixels
    strokeWidth?: number; // Width of the border stroke
}

const CircularBorder: React.FC<CircularBorderProps> = ({ progress, display, size = 60, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    // Cap the strokeDashoffset to a minimum of 0 for values over 100
    const strokeDashoffset = Math.max(0, circumference - (Math.min(progress, 100) / 100) * circumference);

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0fffa3" /> {/* green-400 */}
                        <stop offset="50%" stopColor="#03e1ff" /> {/* blue-200 */}
                        <stop offset="100%" stopColor="#ec84ff" /> {/* purple-400 */}
                    </linearGradient>
                </defs>
                <circle className="text-white/15" stroke="currentColor" fill="transparent" strokeWidth={strokeWidth / 2} r={radius} cx={size / 2} cy={size / 2} />
                <circle
                    className="transform -rotate-90 origin-center"
                    stroke="#03e1ff"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>

            {/* <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
                <circle
                    className="text-transparent"
                    stroke="#03e1ff" // Set the stroke color to #03e1ff
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg> */}

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-blue-200 text-lg font-semibold font-figree">{display}</div>
            </div>
        </div>
    );
};

export default CircularBorder;
