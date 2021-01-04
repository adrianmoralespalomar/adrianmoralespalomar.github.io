const autoplay = (embla, interval) => {
    let timer = 0;
  
    const play = () => {
      stop();
      requestAnimationFrame(() => (timer = window.setTimeout(next, interval)));
    };
  
    const stop = () => {
      window.clearTimeout(timer);
      timer = 0;
    };
  
    const next = () => {
      if (embla.canScrollNext()) {
        embla.scrollNext();
      } else {
        embla.scrollTo(0);
      }
      play();
    };
  
    return { play, stop };
  };
  