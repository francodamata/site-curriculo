// script.js

document.addEventListener("DOMContentLoaded", () => { const lines = document.querySelectorAll(".terminal > *"); let delay = 0;

lines.forEach((line, i) => { const original = line.innerHTML; line.innerHTML = ""; line.style.visibility = "visible";

setTimeout(() => {
  let index = 0;
  const typing = setInterval(() => {
    line.innerHTML = original.slice(0, index++) + '<span class="cursor">|</span>';
    if (index > original.length) {
      clearInterval(typing);
      line.innerHTML = original;
    }
  }, 10);
}, delay);

delay += 500 + original.length * 10;

}); });

