import { useEffect, useRef } from "react";

const CircleProgress = ({
                            value = 50,
                            size = 160,
                            strokeWidth = 10
                        }) => {
    const circleRef = useRef<SVGCircleElement | null>(null);

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const circle = circleRef.current;
        if (!circle) return;

        const offset = circumference - (value / 100) * circumference;
        circle.style.strokeDashoffset = String(offset);
    }, [value, circumference]);

    const getColor = () => {
        if (value >= 80) return "#28a745";
        if (value >= 50) return "#ffc107";
        return "#dc3545";
    };

    return (
        <div style={{ position: "relative", width: size, height: size }}>
            <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#eee"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    ref={circleRef}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={getColor()}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
            </svg>

            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: size * 0.3,
                    fontWeight: 500,
                    color: getColor()
                }}
            >
                {value}
            </div>
        </div>
    );
};

export { CircleProgress };
