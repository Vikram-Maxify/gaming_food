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

  // 🍉 SPAWN FRUITS (REALISTIC ARC)
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) return;

      fruitsRef.current.push({
        x: Math.random() * 450 + 25,
        y: 650,
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
      // 🔥 screen shake
      let shakeX = 0;
      let shakeY = 0;

      if (shakeRef.current > 0) {
        shakeX = (Math.random() - 0.5) * 10;
        shakeY = (Math.random() - 0.5) * 10;
        shakeRef.current -= 1;
      }

      ctx.setTransform(1, 0, 0, 1, shakeX, shakeY);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ✂️ TRAIL (smooth blade)
      if (trailRef.current.length > 1) {
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgba(0,255,255,0.9)";
        ctx.lineCap = "round";

        ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y);

        trailRef.current.forEach((p) => {
          ctx.lineTo(p.x, p.y);
        });

        ctx.stroke();
      }

      // 🍉 FRUITS UPDATE
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

  // 💥 PARTICLE EFFECT
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

  // ✂️ CUT DETECTION (REAL FEEL)
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

  // 🎯 MOUSE / TOUCH
  const handleMove = (e) => {
    if (gameOver) return;

    const rect = canvasRef.current.getBoundingClientRect();

    const x = e.touches
      ? e.touches[0].clientX - rect.left
      : e.clientX - rect.left;

    const y = e.touches
      ? e.touches[0].clientY - rect.top
      : e.clientY - rect.top;

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">

      <h1 className="text-3xl font-bold mb-2">🍉 Fruit Ninja PRO</h1>

      <div className="text-xl mb-2">Score: {score}</div>

      {gameOver && (
        <div className="text-red-500 text-2xl animate-pulse mb-2">
          💥 GAME OVER
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={500}
        height={650}
        className="border border-cyan-400 rounded-xl bg-black"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      />

      <button
        onClick={reset}
        className="mt-4 px-6 py-2 bg-green-500 rounded-lg"
      >
        Restart
      </button>
    </div>
  );
}