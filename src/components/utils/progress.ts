export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent < 90) {
      percent += 1;
      setLoading(percent);
    } else {
      clearInterval(interval);
    }
  }, 40);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent += Math.max(1, Math.floor((100 - percent) / 10)); // Accelerate curve
          if (percent > 100) percent = 100;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 10);
    });
  }
  return { loaded, percent, clear };
};
