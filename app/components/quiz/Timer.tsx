import { useEffect, useState } from "react";
import type { ComponentConfig } from "~/types/quiz";

interface TimerProps {
  config: ComponentConfig["timer"];
}

export function Timer({ config }: TimerProps) {
  if (!config) return null;

  const [timeLeft, setTimeLeft] = useState({
    minutes: config.minutes,
    seconds: config.seconds,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        if (prev.seconds === 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }

        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center text-2xl font-bold">
      {String(timeLeft.minutes).padStart(2, "0")}:
      {String(timeLeft.seconds).padStart(2, "0")}
    </div>
  );
}