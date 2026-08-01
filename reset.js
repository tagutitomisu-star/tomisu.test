(() => {
  const $counter = document.getElementById("js-counter");

  const clickHandler = () => {
    $counter.textContent = 0;
    $counter.style.color = "#666666";
    $counter.style.backgroundColor = "transparent";
    $counter.style.transform = "scale(1)";
  }

  document.getElementById("js-reset-button").addEventListener("click", clickHandler)
})();