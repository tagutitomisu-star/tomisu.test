(() => {
  const $counter = document.getElementById("js-counter");
  const $buttons = document.getElementsByClassName("js-button");

  const MILESTONE_STEP = 10;   // この倍数に到達したらお祝い演出
  const HOLD_DELAY = 400;      // 初回:400ms
  const STEP_DECREASE = 40;    // 実行ごとに40msずつ短縮
  const MIN_INTERVAL = 45;     // 最短間隔:45ms

  let holdTimer = null;
  let didRepeat = false;

  const getCount = () => Number($counter.textContent);

  const updateColor = (value) => {
    if (value > 0) $counter.style.color = "#1e6fd9";
    else if (value < 0) $counter.style.color = "#d92e1e";
    else $counter.style.color = "#666666";
  };

  const celebrate = () => {
    $counter.style.transition = "none";
    $counter.style.backgroundColor = "#fff176";
    $counter.style.transform = "scale(1.4)";
    requestAnimationFrame(() => {
      $counter.style.transition = "background-color 0.5s ease, transform 0.5s ease";
      $counter.style.backgroundColor = "transparent";
      $counter.style.transform = "scale(1)";
    });
  };

  const applyChange = (delta) => {
    const newValue = getCount() + delta;
    $counter.textContent = newValue;
    updateColor(newValue);
    if (newValue !== 0 && newValue % MILESTONE_STEP === 0) celebrate();
  };

  const startHold = (delta) => {
    didRepeat = false;
    let interval = HOLD_DELAY;
    const step = () => {
      didRepeat = true;
      applyChange(delta);
      interval = Math.max(MIN_INTERVAL, interval - STEP_DECREASE);
      holdTimer = setTimeout(step, interval);
    };
    holdTimer = setTimeout(step, interval);
  };

  const endHold = (delta) => {
    clearTimeout(holdTimer);
    holdTimer = null;
    if (!didRepeat) {
      applyChange(delta); // 連続実行が始まる前に離した = 単発クリック扱い
    }
  };

  for (let index = 0; index < $buttons.length; index++) {
    const button = $buttons[index];
    const delta = button.textContent.trim() === "+" ? 1 : -1;
    button.addEventListener("mousedown", () => startHold(delta));
    button.addEventListener("mouseup", () => endHold(delta));
    button.addEventListener("mouseleave", () => { clearTimeout(holdTimer); holdTimer = null; });
    button.addEventListener("touchstart", (e) => { e.preventDefault(); startHold(delta); });
    button.addEventListener("touchend", () => endHold(delta));
  }

  updateColor(getCount());
})();