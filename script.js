const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
const STAR_COUNT = 300; // Adjustable

// Resize Handling
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars();
}

window.addEventListener('resize', resize);

// Star Class
class Star {
    constructor() {
        this.reset();
        // Start at random y to fill screen initially
        this.y = Math.random() * height;
    }

    reset() {
        this.x = Math.random() * width;
        this.y = -10; // Start just above screen
        this.z = Math.random() * 0.5 + 0.5; // Depth/Speed factor
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.flickerSpeed = Math.random() * 0.02 + 0.005;
        this.flickerDir = 1;
    }

    update() {
        this.y += this.z * 0.5; // Move down

        // Flicker effect
        this.opacity += this.flickerSpeed * this.flickerDir;
        if (this.opacity > 1 || this.opacity < 0.2) {
            this.flickerDir *= -1;
        }

        // Reset if out of bounds
        if (this.y > height) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`; // Gold
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Shiny cross effect for larger stars
        if (this.size > 1.5) {
            ctx.globalAlpha = this.opacity * 0.6;
            ctx.beginPath();
            ctx.moveTo(this.x - this.size * 2, this.y);
            ctx.lineTo(this.x + this.size * 2, this.y);
            ctx.moveTo(this.x, this.y - this.size * 2);
            ctx.lineTo(this.x, this.y + this.size * 2);
            ctx.strokeStyle = "gold";
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
        }
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

// Navigation Logic
const navToggle = document.getElementById('nav-toggle');
const body = document.body;

navToggle.addEventListener('click', () => {
    body.classList.toggle('nav-open');
});

// Theme Logic
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        themeLabel.textContent = 'Light';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeLabel.textContent = 'Dark';
    }
});

// Initialize
resize();
animate();
