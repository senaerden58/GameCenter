import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";

const NeonGame = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("useEffect triggered");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    console.log("Canvas initialized with width:", canvas.width, "and height:", canvas.height);

    const particles = [];
    for (let i = 0; i < 50; i++) {
      const particle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      };
      particles.push(particle);
      console.log("Particle created:", particle);
    }

    const animate = () => {
      console.log("Animation frame running");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(10, 28, 46, 0.85)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(0, 170, 255, 0.2)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      particles.forEach((p, index) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 170, 255, 0.8)";
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        console.log(`Particle ${index} position:`, p.x, p.y);
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden flex justify-center items-center bg-black">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center text-white text-3xl font-bold neon-glow"
      >
        🚀 Neon Game Background 🚀
      </motion.div>
    </div>
  );
};

export default NeonGame;