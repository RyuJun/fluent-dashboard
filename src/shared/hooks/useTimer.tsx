import React from 'react';

interface ICounter {
  count: number;
  seconds: string;
  minutes: string;
  hours: string;
  days: string;
}

interface IUseTimerResult {
  isActive?: boolean;
  count?: number;
  seconds?: string;
  minutes?: string;
  hours?: string;
  days?: string;
  pause?: () => void;
  resume?: () => void;
  reset?: () => void;
}

const initialCounter: ICounter = {
  count: 0,
  seconds: '00',
  minutes: '00',
  hours: '00',
  days: '00',
};

export const useTimer = (count: number, onFinish: () => void): IUseTimerResult => {
  const [isActive, setIsActive] = React.useState(true);
  const [counter, setCounter] = React.useState({
    count: count,
    seconds: '',
    minutes: '',
    hours: '',
    days: '',
  });

  React.useEffect(() => {
    // initial setting
    const secondCounter = count % 60;
    const minuteCounter = Math.floor((count % 3600) / 60);
    const hourCounter = Math.floor((count % (3600 * 24)) / 3600);
    const daysCounter = Math.floor(count / (3600 * 24));

    setCounter({
      count: count,
      seconds: timeComuted(secondCounter),
      minutes: timeComuted(minuteCounter),
      hours: timeComuted(hourCounter),
      days: timeComuted(daysCounter),
    });
    document.body.onclick = () => {
      setCounter({
        count: count,
        seconds: timeComuted(secondCounter),
        minutes: timeComuted(minuteCounter),
        hours: timeComuted(hourCounter),
        days: timeComuted(daysCounter),
      });
    };
  }, []);

  React.useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        if (counter.count >= 1) {
          setCounter((counter) => ({ ...counter, count: counter.count - 1 }));
        } else {
          setIsActive(false);
          if (onFinish) {
            onFinish();
          }
        }

        const secondCounter = counter.count % 60;
        const minuteCounter = Math.floor((counter.count % 3600) / 60);
        const hourCounter = Math.floor((counter.count % (3600 * 24)) / 3600);
        const daysCounter = Math.floor(counter.count / (3600 * 24));

        setCounter((counter) => {
          return {
            ...counter,
            seconds: timeComuted(secondCounter),
            minutes: timeComuted(minuteCounter),
            hours: timeComuted(hourCounter),
            days: timeComuted(daysCounter),
          };
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter, onFinish]);

  const timeComuted = (time) => (String(time).length === 1 ? `0${String(time)}` : String(time));

  const pause = () => setIsActive(false);

  const resume = () => setIsActive(true);

  const reset = () => {
    setCounter(initialCounter);
    setIsActive(true);
  };

  return {
    isActive,
    count: counter.count,
    seconds: counter.seconds,
    minutes: counter.minutes,
    hours: counter.hours,
    days: counter.days,
    pause,
    resume,
    reset,
  };
};
