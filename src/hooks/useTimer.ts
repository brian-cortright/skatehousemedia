import { useState, useCallback } from "react";
import { Time, Validate } from "../utils";
import useInterval from "./useInterval";

interface UseTimerConfig {
  expiryTimestamp: Date;
  onExpire?: () => void;
  autoStart?: boolean;
}

interface UseTimerReturn {
  totalSeconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  start: () => void;
  pause: () => void;
  resume: () => void;
  restart: (_newExpiryTimestamp: Date, _newAutoStart?: boolean) => void;
  isRunning: boolean;
}

const DEFAULT_DELAY = 1000;

function getDelayFromExpiryTimestamp(expiryTimestamp: Date): number | null {
  if (!Validate.expiryTimestamp(expiryTimestamp)) {
    return null;
  }

  const seconds = Time.getSecondsFromExpiry(expiryTimestamp);
  const extraMilliSeconds = Math.floor((seconds - Math.floor(seconds)) * 1000);
  return extraMilliSeconds > 0 ? extraMilliSeconds : DEFAULT_DELAY;
}

export default function useTimer({
  expiryTimestamp: expiry,
  onExpire,
  autoStart = true,
}: UseTimerConfig): UseTimerReturn {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [seconds, setSeconds] = useState(
    Time.getSecondsFromExpiry(expiryTimestamp)
  );
  const [isRunning, setIsRunning] = useState(autoStart);
  const [didStart, setDidStart] = useState(autoStart);
  const [delay, setDelay] = useState<number | null>(
    getDelayFromExpiryTimestamp(expiryTimestamp)
  );

  const handleExpire = useCallback(() => {
    Validate.onExpire(onExpire) && onExpire?.();
    setIsRunning(false);
    setDelay(null);
  }, [onExpire]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const restart = useCallback((newExpiryTimestamp: Date, newAutoStart: boolean = true) => {
    setDelay(getDelayFromExpiryTimestamp(newExpiryTimestamp));
    setDidStart(newAutoStart);
    setIsRunning(newAutoStart);
    setExpiryTimestamp(newExpiryTimestamp);
    setSeconds(Time.getSecondsFromExpiry(newExpiryTimestamp));
  }, []);

  const resume = useCallback(() => {
    const time = new Date();
    time.setMilliseconds(time.getMilliseconds() + seconds * 1000);
    restart(time);
  }, [seconds, restart]);

  const start = useCallback(() => {
    if (didStart) {
      setSeconds(Time.getSecondsFromExpiry(expiryTimestamp));
      setIsRunning(true);
    } else {
      resume();
    }
  }, [expiryTimestamp, didStart, resume]);

  useInterval(
    () => {
      if (delay !== DEFAULT_DELAY) {
        setDelay(DEFAULT_DELAY);
      }
      const secondsValue = Time.getSecondsFromExpiry(expiryTimestamp);
      setSeconds(secondsValue);
      if (secondsValue <= 0) {
        handleExpire();
      }
    },
    isRunning ? delay : null
  );

  return {
    ...Time.getTimeFromSeconds(seconds),
    start,
    pause,
    resume,
    restart,
    isRunning,
  };
}
