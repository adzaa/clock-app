import React, { useEffect, useRef } from "react";

const Clock = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const drawClock = (ctx) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 80;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.stroke();

      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 1; i <= 12; i++) {
        const angle = ((i - 3) * (Math.PI * 2)) / 12;
        const x = centerX + Math.cos(angle) * (radius - 20);
        const y = centerY + Math.sin(angle) * (radius - 20);
        ctx.fillText(i.toString(), x, y);
      }

      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const hourAngle = ((hours - 3 + minutes / 60) * (Math.PI * 2)) / 12;
      const hourHandLength = radius * 0.5;
      const hourHandX = centerX + Math.cos(hourAngle) * hourHandLength;
      const hourHandY = centerY + Math.sin(hourAngle) * hourHandLength;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(hourHandX, hourHandY);
      ctx.stroke();

      const minuteAngle = ((minutes - 15 + seconds / 60) * (Math.PI * 2)) / 60;
      const minuteHandLength = radius * 0.7;
      const minuteHandX = centerX + Math.cos(minuteAngle) * minuteHandLength;
      const minuteHandY = centerY + Math.sin(minuteAngle) * minuteHandLength;
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(minuteHandX, minuteHandY);
      ctx.stroke();

      const secondAngle = ((seconds - 15) * (Math.PI * 2)) / 60;
      const secondHandLength = radius * 0.9;
      const secondHandX = centerX + Math.cos(secondAngle) * secondHandLength;
      const secondHandY = centerY + Math.sin(secondAngle) * secondHandLength;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(secondHandX, secondHandY);
      ctx.stroke();
    };

    const animateClock = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawClock(context);
      requestAnimationFrame(animateClock);
    };

    animateClock();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      style={{ border: "1px solid black" }}
    />
  );
};

export default Clock;
