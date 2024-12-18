import { formatPercentage } from "@/utils/displayUtils";

interface CircularProgressProps {
    progress: number; // Progress percentage (0-100+)
    size?: number; // Size of the circular progress bar in pixels
    strokeWidth?: number; // Width of the progress bar stroke
}

const CircularProgress: React.FC<CircularProgressProps> = ({ progress, size = 100, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    // Cap the strokeDashoffset to a minimum of 0 for values over 100
    const strokeDashoffset = Math.max(0, circumference - Math.min(progress, 100) / 100 * circumference);
    
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
                    stroke="url(#progressGradient)"
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

            <div className="absolute inset-0 flex items-center justify-center">
                {/* Show percentage, allowing it to exceed 100% */}
                <div className="bg-gradient-to-r from-green-400 via-blue-200 to-purple-400 inline-block text-transparent bg-clip-text text-base font-semibold font-figree">
                    {formatPercentage(progress)}
                </div>
            </div>
        </div>
    );
};

export default CircularProgress;