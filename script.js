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

// Square Class
class Square {
    constructor() {
        this.reset();
        // Start mixed in screen
        this.y = Math.random() * height;
    }

    reset() {
        this.x = Math.random() * width;
        this.y = -50;
        this.size = Math.random() * 20 + 5; // Squares
        this.speed = Math.random() * 1 + 0.2;
        this.opacity = Math.random() * 0.3 + 0.1; // Subtle
    }

    update() {
        this.y += this.speed;

        // Reset if out of bounds
        if (this.y > height + 50) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = `rgba(180, 220, 220, ${this.opacity})`; // Light Cyan Greyish
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Square());
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
// Navigation Logic
// (Floating nav requires no JS for opening/closing, just default link behavior)

// Theme Logic
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    if (!!currentTheme) {
        // Switch to Dark
        document.documentElement.removeAttribute('data-theme');
    } else {
        // Switch to Light
        document.documentElement.setAttribute('data-theme', 'light');
    }
});

// Initialize
resize();
animate();
