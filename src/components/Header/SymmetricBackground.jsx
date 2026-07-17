import { useEffect, useRef } from "react";

export default function SymmetricBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Pattern configuration
    const numPoints = 12;
    const points = [];

    // Generate random points in a larger quadrant space [0.05, 0.85]
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * 0.75 + 0.05,
        y: Math.random() * 0.75 + 0.05,
        vx: (Math.random() - 0.5) * 0.0008,
        vy: (Math.random() - 0.5) * 0.0008,
        radius: Math.random() * 2 + 1.5,
      });
    }

    let rotationAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const maxSize = Math.max(width, height);
      const centerX = width / 2;
      const centerY = height / 2;

      // Update particle coordinates
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0.02 || p.x > 0.88) p.vx *= -1;
        if (p.y < 0.02 || p.y > 0.88) p.vy *= -1;
      });

      rotationAngle += 0.00025; // Slow rotation

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotationAngle);

      const symmetries = 8;
      const symAngle = (Math.PI * 2) / symmetries;
      const maxRadius = maxSize * 0.65; // Covers nearly the full screen

      ctx.shadowBlur = 2; // Low blur to keep lines crisp and sharp

      // Draw symmetric sectors
      for (let s = 0; s < symmetries; s++) {
        ctx.save();
        ctx.rotate(s * symAngle);

        // Draw connections
        for (let i = 0; i < points.length; i++) {
          const p1 = points[i];
          const x1 = p1.x * maxRadius;
          const y1 = p1.y * maxRadius;

          for (let j = i + 1; j < points.length; j++) {
            const p2 = points[j];
            const x2 = p2.x * maxRadius;
            const y2 = p2.y * maxRadius;

            const dx = x1 - x2;
            const dy = y1 - y2;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Connect nearby points
            if (dist < maxRadius * 0.32) {
              const alpha = (1 - dist / (maxRadius * 0.32)) * 0.35; // Increased contrast from 0.12 to 0.35

              const hue = (s * (360 / symmetries) + i * 20) % 360;
              ctx.strokeStyle = `hsla(${hue}, 90%, 60%, ${alpha})`;
              ctx.shadowColor = `hsla(${hue}, 90%, 60%, 0.45)`;
              ctx.lineWidth = 1.2; // Slightly thicker lines for visibility

              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();

              // Reflect connection within same sector
              ctx.beginPath();
              ctx.moveTo(x1, -y1);
              ctx.lineTo(x2, -y2);
              ctx.stroke();
            }
          }
        }

        // Draw node points
        points.forEach((p, idx) => {
          const x = p.x * maxRadius;
          const y = p.y * maxRadius;
          const hue = (s * (360 / symmetries) + idx * 20) % 360;

          ctx.fillStyle = `hsla(${hue}, 90%, 65%, 0.45)`; // Increased opacity
          ctx.shadowColor = `hsla(${hue}, 90%, 65%, 0.7)`;

          ctx.beginPath();
          ctx.arc(x, y, p.radius, 0, Math.PI * 2);
          ctx.arc(x, -y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      }

      ctx.restore();

      // Refined radial gradient starts fade further out to keep center bright
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        maxSize * 0.18,
        centerX,
        centerY,
        maxSize * 0.72
      );
      gradient.addColorStop(0, "rgba(11, 11, 15, 0)");
      gradient.addColorStop(0.45, "rgba(11, 11, 15, 0.2)");
      gradient.addColorStop(0.85, "rgba(11, 11, 15, 0.78)");
      gradient.addColorStop(1, "rgba(11, 11, 15, 0.98)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
