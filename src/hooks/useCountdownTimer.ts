import { useState, useEffect, useRef } from 'react';

export function useCountdownTimer(initialTimeStr: string) {
  const [timeLeft, setTimeLeft] = useState(initialTimeStr);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const totalSecondsRef = useRef(0);

  // Parse "MM:SS" into total seconds
  useEffect(() => {
    const [minStr, secStr] = initialTimeStr.split(':');
    if (minStr && secStr) {
      totalSecondsRef.current = parseInt(minStr, 10) * 60 + parseInt(secStr, 10);
    }
    setTimeLeft(initialTimeStr);
    setIsActive(false);
    setIsFinished(false);
  }, [initialTimeStr]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && totalSecondsRef.current > 0) {
      intervalId = setInterval(() => {
        totalSecondsRef.current -= 1;
        
        if (totalSecondsRef.current <= 0) {
          clearInterval(intervalId);
          setTimeLeft('00:00');
          setIsActive(false);
          setIsFinished(true);
          return;
        }

        const m = Math.floor(totalSecondsRef.current / 60).toString().padStart(2, '0');
        const s = (totalSecondsRef.current % 60).toString().padStart(2, '0');
        setTimeLeft(`${m}:${s}`);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive]);

  const startTimer = () => {
    if (!isActive && !isFinished) {
      setIsActive(true);
    }
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsFinished(false);
    const [minStr, secStr] = initialTimeStr.split(':');
    totalSecondsRef.current = parseInt(minStr, 10) * 60 + parseInt(secStr, 10);
    setTimeLeft(initialTimeStr);
  };

  return { timeLeft, startTimer, stopTimer, resetTimer, isActive, isFinished };
}
