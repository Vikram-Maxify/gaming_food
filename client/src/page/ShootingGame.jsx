import React, { useEffect, useRef, useState } from "react";

export default function ShootingGameRealStick() {
  const canvasRef = useRef(null);

  const player = useRef({ x: 250, y: 550 });
  const mouse = useRef({ x: 250, y: 550 });

  const bullets = useRef([]);
  const enemies = useRef([]);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // 👾 ENEMY SPAWN
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) return;

      enemies.current.push({
        x: Math.random() * 480 + 10,
        y: 0,
        r: 18,
        speed: 2 + Math.random() * 2,
      });
    }, 700);

    return () => clearInterval(interval);
  }, [gameOver]);

  // 🎮 GAME LOOP
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 🧠 SMOOTH FOLLOW (REAL STICK FEEL)
      player.current.x = lerp(player.current.x, mouse.current.x, 0.1);
      player.current.y = lerp(player.current.y, mouse.current.y, 0.1);

      // 👤 PLAYER
      ctx.fillStyle = "cyan";
      ctx.beginPath();
      ctx.arc(player.current.x, player.current.y, 15, 0, Math.PI * 2);
      ctx.fill();

      // 🔫 AUTO SHOOT (every frame slow fire feel)
      if (Math.random() < 0.1 && !gameOver) {
        bullets.current.push({
          x: player.current.x,
          y: player.current.y - 20,
        });
      }

      // 🔫 BULLETS
      bullets.current.forEach((b, i) => {
        b.y -= 6;

        ctx.fillStyle = "yellow";
        ctx.fillRect(b.x, b.y, 4, 10);

        if (b.y < 0) bullets.current.splice(i, 1);
      });

      // 👾 ENEMIES
      enemies.current.forEach((e, ei) => {
        e.y += e.speed;

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();

        // 💥 GAME OVER
        if (e.y > 600) setGameOver(true);

        // 💥 COLLISION
        bullets.current.forEach((b, bi) => {
          const dist = Math.hypot(e.x - b.x, e.y - b.y);

          if (dist < e.r) {
            enemies.current.splice(ei, 1);
            bullets.current.splice(bi, 1);
            setScore((s) => s + 1);
          }
        });
      });

      requestAnimationFrame(loop);
    };

    loop();
  }, [gameOver]);

  // 🖱️ MOUSE MOVE (REAL STICK CONTROL)
  const handleMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();

    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
  };

  // 🔄 RESET
  const reset = () => {
    enemies.current = [];
    bullets.current = [];
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">

      <h1 className="text-2xl font-bold mb-2">🎮 Real Stick Shooter</h1>

      <div className="mb-2">Score: {score}</div>

      {gameOver && (
        <div className="text-red-500 text-xl mb-2">💥 Game Over</div>
      )}

      <canvas
        ref={canvasRef}
        width={500}
        height={600}
        className="border border-cyan-400 bg-gray-900 rounded-lg"
        onMouseMove={handleMove}
      />

      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-green-500 rounded"
      >
        Restart
      </button>
    </div>
  );
}