(() => {
  const STEP = 0.1;
  const MIN_RATE = 0.1;
  const MAX_RATE = 16;

  function getVideo() {
    return document.querySelector('video');
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function roundToTenths(value) {
    return Math.round(value * 10) / 10;
  }

  function updatePlaybackRate(delta) {
    const video = getVideo();
    if (!video) {
      return;
    }

    const nextRate = clamp(roundToTenths(video.playbackRate + delta), MIN_RATE, MAX_RATE);
    video.playbackRate = nextRate;

    if (typeof unsafeWindow !== 'undefined' && typeof unsafeWindow?.showToast === 'function') {
      unsafeWindow.showToast(`Playback speed: ${nextRate.toFixed(1)}x`);
    }
  }

  window.addEventListener('keydown', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement) {
      const tag = target.tagName.toLowerCase();
      const isEditable = target.isContentEditable || tag === 'input' || tag === 'textarea' || tag === 'select';
      if (isEditable) {
        return;
      }
    }

    if (event.key === '[') {
      updatePlaybackRate(-STEP);
    } else if (event.key === ']') {
      updatePlaybackRate(STEP);
    }
  });
})();
