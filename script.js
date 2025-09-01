// MATRIX background (HBdev letters)
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "HBdev".split("");
const fontSize = 20;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00FF00";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// Popup message logic
const popup = document.querySelector('.popup');

function explodeMessage() {
    const rect = popup.getBoundingClientRect();
    const particlesCount = 120;
    const maxDistance = 250;

    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        document.body.appendChild(particle);

        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * maxDistance + 50;
        const size = Math.random() * 8 + 3;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = `hsl(${Math.random()*360}, 100%, 50%)`;

        particle.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance - 100}px) scale(0.5)`, opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 1000,
            easing: 'ease-out'
        });

        setTimeout(() => particle.remove(), 3000);
    }

    popup.style.transition = 'opacity 2s ease';
    popup.style.opacity = 0;
}

// Slide up message then explode like firework
setTimeout(() => {
    popup.classList.add('show');

    // Firework explode after it reaches center
    setTimeout(explodeMessage, 2500);
}, 1000);
