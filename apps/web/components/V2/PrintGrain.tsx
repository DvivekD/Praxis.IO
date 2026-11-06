"use client";

import { useEffect, useRef } from "react";

/**
 * PrintGrain: Generates an ultra-fine tactile grain overlay on an offscreen canvas tile,
 * rendered at half-resolution with CSS overlay blend mode for zero performance penalty.
 * Replicates the Archon print-grain industrial aesthetic.
 */
export function PrintGrain({ opacity = 0.04 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Create 128x128 noise tile
    const tile = document.createElement("canvas");
    tile.width = 128;
    tile.height = 128;
    const tCtx = tile.getContext("2d");
    if (!tCtx) return;

    const imgData = tCtx.createImageData(128, 128);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = (Math.random() * 45) | 0;
    }
    tCtx.putImageData(imgData, 0, 0);

    const pattern = ctx.createPattern(tile, "repeat");

    let animId = 0;
    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / 2);
      canvas.height = Math.ceil(window.innerHeight / 2);
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 50,
        opacity,
        mixBlendMode: "overlay",
      }}
    />
  );
}
