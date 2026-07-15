const PASSWORD = "dushman";

const scenes = [...document.querySelectorAll(".scene")];
const journeyFill = document.getElementById("journeyFill");
const sparkleLayer = document.getElementById("sparkleLayer");

let currentSceneIndex = 0;
let openedMemoryCards = 0;
let currentLap = 0;
let grownFlowers = 0;
let letterHasBeenRevealed = false;
let soundIsOn = false;

/* ------------------------------
   PAGE NAVIGATION
------------------------------ */

function showScene(sceneId) {
  scenes.forEach(scene => {
    scene.classList.remove("active");
  });

  const targetScene = document.getElementById(sceneId);

  if (!targetScene) {
    console.error(`Scene not found: ${sceneId}`);
    return;
  }

  targetScene.classList.add("active");

  currentSceneIndex = scenes.indexOf(targetScene);

  if (journeyFill && scenes.length > 1) {
    const progress =
      (currentSceneIndex / (scenes.length - 1)) * 100;

    journeyFill.style.width = `${progress}%`;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (sceneId === "letterScene") {
    revealLetter();
  }
}

/* ------------------------------
   SPARKLE ANIMATION
------------------------------ */

function sparkleBurst(amount = 22) {
  if (!sparkleLayer) {
    return;
  }

  const icons = [
    "✦",
    "♡",
    "♥",
    "✨",
    "🌼",
    "🐧",
    "😈"
  ];

  for (let index = 0; index < amount; index++) {
    setTimeout(() => {
      const sparkle = document.createElement("span");

      sparkle.className = "sparkle";

      sparkle.textContent =
        icons[Math.floor(Math.random() * icons.length)];

      sparkle.style.left =
        `${Math.random() * 100}vw`;

      sparkle.style.top =
        `${40 + Math.random() * 45}vh`;

      sparkle.style.fontSize =
        `${14 + Math.random() * 22}px`;

      sparkle.style.transform =
        `rotate(${Math.random() * 30 - 15}deg)`;

      sparkleLayer.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1700);
    }, index * 45);
  }
}

/* ------------------------------
   PASSWORD SCREEN
------------------------------ */

const unlockButton =
  document.getElementById("unlockBtn");

const passwordInput =
  document.getElementById("passwordInput");

const errorMessage =
  document.getElementById("errorMsg");

function unlockWebsite() {
  if (!passwordInput || !errorMessage) {
    return;
  }

  const enteredPassword =
    passwordInput.value.trim();

  if (enteredPassword === PASSWORD) {
    errorMessage.textContent = "";

    showScene("welcomeScene");

    sparkleBurst(40);
  } else {
    errorMessage.textContent =
      "Wrong password, dushman. Try again ♡";

    passwordInput.value = "";
    passwordInput.focus();
  }
}

if (unlockButton) {
  unlockButton.addEventListener(
    "click",
    unlockWebsite
  );
}

if (passwordInput) {
  passwordInput.addEventListener(
    "keydown",
    event => {
      if (event.key === "Enter") {
        unlockWebsite();
      }
    }
  );
}

/* ------------------------------
   NEXT PAGE BUTTONS
------------------------------ */

document
  .querySelectorAll(".next")
  .forEach(button => {
    button.addEventListener("click", () => {
      const nextScene =
        button.dataset.next;

      if (!nextScene) {
        return;
      }

      showScene(nextScene);
      sparkleBurst(10);
    });
  });

/* ------------------------------
   MEMORY CARDS
------------------------------ */

const memoryCards =
  document.querySelectorAll(".memory-card");

const memoryNextButton =
  document.getElementById("memoryNext");

memoryCards.forEach(card => {
  card.addEventListener("click", () => {
    if (card.classList.contains("open")) {
      return;
    }

    card.classList.add("open");

    openedMemoryCards++;

    sparkleBurst(6);

    if (
      openedMemoryCards ===
      memoryCards.length
    ) {
      if (memoryNextButton) {
        memoryNextButton.disabled = false;

        memoryNextButton.textContent =
          "to the race →";
      }

      sparkleBurst(24);
    }
  });
});

/* ------------------------------
   F1-STYLE RACE GAME
------------------------------ */

const raceCar =
  document.getElementById("raceCar");

const lapMessage =
  document.getElementById("lapMessage");

const podium =
  document.getElementById("podium");

const raceNextButton =
  document.getElementById("raceNext");

const raceMessages = [
  "Lap 1: You are allowed to begin again.",
  "Lap 2: A difficult season is still only a season.",
  "Final lap: Keep going. The finish line is closer than it looks."
];

function moveRaceCar() {
  if (!raceCar || currentLap >= 3) {
    return;
  }

  currentLap++;

  raceCar.style.left =
    `calc(${currentLap * 24}% - 10px)`;

  if (lapMessage) {
    lapMessage.textContent =
      raceMessages[currentLap - 1];
  }

  sparkleBurst(9);

  if (currentLap === 3) {
    setTimeout(() => {
      if (podium) {
        podium.classList.add("show");
      }

      if (raceNextButton) {
        raceNextButton.disabled = false;

        raceNextButton.textContent =
          "take the podium 🏆";
      }

      sparkleBurst(40);
    }, 700);
  }
}

if (raceCar) {
  raceCar.addEventListener(
    "click",
    moveRaceCar
  );
}

/* ------------------------------
   HOPE GARDEN
------------------------------ */

const seeds =
  document.querySelectorAll(".seed");

const gardenNextButton =
  document.getElementById("gardenNext");

seeds.forEach(seed => {
  seed.addEventListener("click", () => {
    if (seed.classList.contains("grown")) {
      return;
    }

    seed.classList.add("grown");

    const flower =
      seed.dataset.flower || "🌼";

    seed.innerHTML = flower;

    grownFlowers++;

    sparkleBurst(7);

    if (grownFlowers === seeds.length) {
      if (gardenNextButton) {
        gardenNextButton.disabled = false;

        gardenNextButton.textContent =
          "carry the hope with you →";
      }

      sparkleBurst(28);
    }
  });
});

/* ------------------------------
   LETTER REVEAL
------------------------------ */

function revealLetter() {
  if (letterHasBeenRevealed) {
    return;
  }

  letterHasBeenRevealed = true;

  const letterLines =
    document.querySelectorAll(
      ".reveal-line"
    );

  letterLines.forEach(
    (line, index) => {
      setTimeout(() => {
        line.classList.add("visible");
      }, index * 650);
    }
  );
}

/* ------------------------------
   FINAL NOTE
------------------------------ */

const finalButton =
  document.getElementById("finalButton");

const lastNote =
  document.getElementById("lastNote");

if (finalButton && lastNote) {
  finalButton.addEventListener(
    "click",
    () => {
      lastNote.classList.add("show");

      finalButton.style.display = "none";

      sparkleBurst(50);
    }
  );
}

/* ------------------------------
   OPTIONAL MUSIC
------------------------------ */

const soundToggle =
  document.getElementById("soundToggle");

const backgroundMusic =
  document.getElementById("bgMusic");

async function toggleSound() {
  soundIsOn = !soundIsOn;

  if (!soundToggle) {
    return;
  }

  soundToggle.textContent =
    soundIsOn ? "♫" : "♪";

  if (!backgroundMusic) {
    return;
  }

  const audioSource =
    backgroundMusic.querySelector("source");

  const hasMusicFile =
    audioSource &&
    audioSource.getAttribute("src");

  if (!hasMusicFile) {
    soundIsOn = false;
    soundToggle.textContent = "♪";

    alert(
      "To add music, upload a file called music.mp3 and change the audio source in index.html."
    );

    return;
  }

  try {
    if (soundIsOn) {
      backgroundMusic.volume = 0.35;
      await backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  } catch (error) {
    soundIsOn = false;
    soundToggle.textContent = "♪";

    console.error(
      "Music could not be played:",
      error
    );
  }
}

if (soundToggle) {
  soundToggle.addEventListener(
    "click",
    toggleSound
  );
}

/* ------------------------------
   SMALL EXTRA ANIMATIONS
------------------------------ */

document
  .querySelectorAll(
    ".special-stack article"
  )
  .forEach(card => {
    card.addEventListener(
      "mouseenter",
      () => {
        sparkleBurst(3);
      }
    );
  });

document.addEventListener(
  "visibilitychange",
  () => {
    if (
      document.hidden &&
      backgroundMusic &&
      !backgroundMusic.paused
    ) {
      backgroundMusic.pause();

      soundIsOn = false;

      if (soundToggle) {
        soundToggle.textContent = "♪";
      }
    }
  }
);
