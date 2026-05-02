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

  function isEditableTarget(target) {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    const tag = target.tagName.toLowerCase();
    return target.isContentEditable || tag === 'input' || tag === 'textarea' || tag === 'select';
  }

  function updatePlaybackRate(delta) {
    const video = getVideo();
    if (!video) {
      return;
    }

    const nextRate = clamp(roundToTenths(video.playbackRate + delta), MIN_RATE, MAX_RATE);
    video.playbackRate = nextRate;
  }

  window.addEventListener(
    'keydown',
    (event) => {
      if (event.defaultPrevented || event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      if (isEditableTarget(event.target)) {
        return;
      }

      if (event.key === '[') {
        event.preventDefault();
        event.stopPropagation();
        updatePlaybackRate(-STEP);
      } else if (event.key === ']') {
        event.preventDefault();
        event.stopPropagation();
        updatePlaybackRate(STEP);
      }
    },
    true,
  );
})();
