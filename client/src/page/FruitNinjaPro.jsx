import React, { useEffect, useRef, useState } from "react";

export default function FruitNinjaPro() {
  const canvasRef = useRef(null);

  const fruitsRef = useRef([]);
  const trailRef = useRef([]);
  const particlesRef = useRef([]);
  const imagesRef = useRef({});

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const shakeRef = useRef(0);

  // 🖼️ LOAD IMAGES
  useEffect(() => {
    const load = (src) => {
      const img = new Image();
      img.src = src;
      return img;
    };

    imagesRef.current = {
      apple: load("/fruits/apple.png"),
      banana: load("/fruits/banana.png"),
      watermelon: load("/fruits/watermelon.png"),
      bomb: load("/fruits/bomb.png"),
    };
  }, []);

  // 📱 RESPONSIVE CANVAS
  useEffect(() => {
    const canvas = canvasRef.current;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // 🍉 SPAWN FRUITS
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) return;

      const canvas = canvasRef.current;

      fruitsRef.current.push({
        x: Math.random() * canvas.width,
        y: canvas.height,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 8 - 10,
        g: 0.35,
        r: 28,
        sliced: false,
        type: ["apple", "banana", "watermelon"][
          Math.floor(Math.random() * 3)
        ],
        bomb: Math.random() < 0.12,
        rot: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
      });
    }, 700);

    return () => clearInterval(interval);
  }, [gameOver]);

  // 🎮 GAME LOOP
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const animate = () => {
      let shakeX = 0;
      let shakeY = 0;

      if (shakeRef.current > 0) {
        shakeX = (Math.random() - 0.5) * 10;
        shakeY = (Math.random() - 0.5) * 10;
        shakeRef.current--;
      }

      ctx.setTransform(1, 0, 0, 1, shakeX, shakeY);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ✂️ TRAIL
      if (trailRef.current.length > 1) {
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgba(0,255,255,0.9)";
        ctx.lineCap = "round";

        ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y);
        trailRef.current.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.stroke();
      }

      // 🍉 FRUITS
      fruitsRef.current.forEach((f) => {
        if (f.sliced) return;

        f.x += f.vx;
        f.y += f.vy;
        f.vy += f.g;
        f.rot += f.vr;

        const img = f.bomb
          ? imagesRef.current.bomb
          : imagesRef.current[f.type];

        if (img) {
          ctx.save();
          ctx.translate(f.x, f.y);
          ctx.rotate((f.rot * Math.PI) / 180);
          ctx.drawImage(img, -28, -28, 56, 56);
          ctx.restore();
        }
      });

      // 💥 PARTICLES
      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.life--;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);

        if (p.life <= 0) particlesRef.current.splice(i, 1);
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  // 💥 PARTICLES
  const explode = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 30,
        color,
      });
    }
  };

  // ✂️ CUT DETECTION
  const isCut = (fruit, trail) => {
    for (let i = 0; i < trail.length - 1; i++) {
      const dx = trail[i + 1].x - trail[i].x;
      const dy = trail[i + 1].y - trail[i].y;

      const fx = fruit.x - trail[i].x;
      const fy = fruit.y - trail[i].y;

      const t = (fx * dx + fy * dy) / (dx * dx + dy * dy);
      const c = Math.max(0, Math.min(1, t));

      const cx = trail[i].x + c * dx;
      const cy = trail[i].y + c * dy;

      const dist = Math.hypot(fruit.x - cx, fruit.y - cy);

      if (dist < fruit.r) return true;
    }
    return false;
  };

  // 🎯 INPUT HANDLER
  const handleMove = (e) => {
    if (gameOver) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    trailRef.current.push({ x, y });
    if (trailRef.current.length > 8) trailRef.current.shift();

    fruitsRef.current.forEach((f) => {
      if (!f.sliced && isCut(f, trailRef.current)) {
        f.sliced = true;

        if (f.bomb) {
          shakeRef.current = 20;
          setGameOver(true);
          explode(f.x, f.y, "red");
        } else {
          setScore((s) => s + 1);
          explode(f.x, f.y, "yellow");
        }
      }
    });
  };

  const reset = () => {
    fruitsRef.current = [];
    trailRef.current = [];
    particlesRef.current = [];
    setScore(0);
    setGameOver(false);
  };

  return (
<div className="h-screen overflow-hidden flex flex-col items-center justify-center bg-black text-white px-2 relative">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        🍉 Fruit Ninja PRO
      </h1>

      <div className="text-lg md:text-xl mb-2">Score: {score}</div>

      <canvas
        ref={canvasRef}
        className="w-full max-w-[500px] aspect-[5/6.5] border overflow-y-hidden
         border-cyan-400 rounded-xl bg-black"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      />

      {/* 💥 GAME OVER SCREEN */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10">

          <div className="text-red-500 text-3xl mb-4 animate-pulse">
            💥 GAME OVER
          </div>

          <button
            onClick={reset}
            className="px-8 py-3 bg-green-500 text-xl rounded-lg shadow-lg"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}