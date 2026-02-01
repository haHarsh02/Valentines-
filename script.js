const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const popup = document.getElementById("popup");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

let yesScale = 1;

const messages = [
  "Hehe 😜 nice try",
  "Nope 😏",
  "That button is broken 💕",
  "Why are you like this 🥺",
  "Just say yes already 😆"
];

function showPopup() {
  popup.textContent = messages[Math.floor(Math.random() * messages.length)];
  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");
  }, 1200);
}

function moveNoButton() {
  const maxX = window.innerWidth / 2 - 100;
  const maxY = window.innerHeight / 2 - 150;

  const x = Math.random() * maxX * 2 - maxX;
  const y = Math.random() * maxY * 2 - maxY;
  const rotation = Math.random() * 20 - 10;

  noBtn.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

  yesScale += 0.12;
  yesBtn.style.transform = `scale(${yesScale})`;

  showPopup();
}

/* Desktop */
noBtn.addEventListener("mouseover", moveNoButton);

/* Mobile */
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  page1.classList.add("hidden");
  page2.classList.remove("hidden");
  startConfetti();
});

/* Confetti */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function startConfetti() {
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 10,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`
    });
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();
    c.y += c.d * 0.35;
    if (c.y > canvas.height) c.y = 0;
  });
  requestAnimationFrame(animateConfetti);
}
