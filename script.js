const PASSWORD = "Chaman";

const screens = document.querySelectorAll(".screen");
const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const errorMsg = document.getElementById("errorMsg");
const heartContainer = document.getElementById("heartContainer");

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function popHearts(amount = 28) {
  const symbols = ["♥", "♡", "💗", "💕"];

  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = 15 + Math.random() * 25 + "px";
      heart.style.animationDuration = 3.5 + Math.random() * 3 + "s";
      heart.style.opacity = 0.7 + Math.random() * 0.3;

      heartContainer.appendChild(heart);

      setTimeout(() => heart.remove(), 7000);
    }, i * 80);
  }
}

function unlock() {
  if (passwordInput.value.trim() === PASSWORD) {
    errorMsg.textContent = "";
    showScreen("thankYouScreen");
    popHearts(38);
  } else {
    errorMsg.textContent = "That isn't the password ❤️";
    passwordInput.value = "";
    passwordInput.focus();
  }
}

unlockBtn.addEventListener("click", unlock);

passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") unlock();
});

document.querySelectorAll(".next-btn").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.next);

    if (button.dataset.next === "goodbyeScreen") {
      popHearts(16);
    }
  });
});

document.getElementById("replayBtn").addEventListener("click", () => {
  showScreen("thankYouScreen");
  popHearts(24);
});
