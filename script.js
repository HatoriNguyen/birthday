// YouTube Player API Integration
let player;
let isPlaying = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'WjV56-hJ-Rk',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'disablekb': 1,
            'fs': 0,
            'rel': 0,
            'modestbranding': 1,
            'loop': 1,
            'playlist': 'WjV56-hJ-Rk'
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log("YouTube Player is ready");
}

function onPlayerStateChange(event) {
    const vinyl = document.getElementById('vinyl-disc');
    const playBtn = document.getElementById('play-pause-btn');
    
    if (event.data == YT.PlayerState.PLAYING) {
        isPlaying = true;
        vinyl.classList.remove('paused');
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        isPlaying = false;
        vinyl.classList.add('paused');
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

// Global Birthday Code Execution
document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const openBtn = document.getElementById('open-btn');
    const welcomeGate = document.getElementById('welcome-gate');
    const mainContent = document.getElementById('main-content');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const vinylDisc = document.getElementById('vinyl-disc');
    
    // Initial State: Vinyl disc paused
    vinylDisc.classList.add('paused');

    // 1. OPEN GIFT BOX GATE EVENT
    openBtn.addEventListener('click', () => {
        // Play music
        if (player && typeof player.playVideo === 'function') {
            player.playVideo();
            player.setVolume(100);
        }
        
        // Hide gate & show main content
        welcomeGate.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        // Start effects
        startEmojiRain();
        initFireworks();
        triggerInitialBlast();
    });

    // 2. MUSIC PLAY / PAUSE CONTROLS
    playPauseBtn.addEventListener('click', () => {
        if (!player) return;
        
        if (isPlaying) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    });

    // 3. VIRTUAL CAKE - BLOW CANDLES LOGIC
    const candles = document.querySelectorAll('.candle');
    const cakeStatus = document.getElementById('cake-status');
    let blownCount = 0;

    candles.forEach((candle, index) => {
        candle.addEventListener('click', () => {
            if (!candle.classList.contains('blown-out')) {
                candle.classList.add('blown-out');
                blownCount++;
                
                // Small explosion of confetti at the candle position
                const rect = candle.getBoundingClientRect();
                spawnConfetti(rect.left + rect.width/2, rect.top);
                
                if (blownCount === 1) {
                    cakeStatus.innerHTML = 'Thổi tiếp ngọn nữa nào! 🕯️';
                } else if (blownCount === 2) {
                    cakeStatus.innerHTML = 'Còn một ngọn nến cuối cùng kìa! 🔥';
                } else if (blownCount === 3) {
                    cakeStatus.innerHTML = 'Ước nguyện thành công! 🌟 Mãi mận nha Khang! 🎉';
                    cakeStatus.style.color = '#05d9e8';
                    
                    // Trigger massive firework show
                    triggerMassiveBlast();
                }
            }
        });
    });

    // 4. WISHES CAROUSEL LOGIC
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Auto rotate wishes every 8 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 8000);

    // 5. STICKERS AND SLANG DOCK
    const stickers = document.querySelectorAll('.sticker');
    const toast = document.getElementById('slang-toast');
    let toastTimeout;

    stickers.forEach(sticker => {
        sticker.addEventListener('click', (e) => {
            const slangText = sticker.getAttribute('data-slang');
            
            // Show custom toast notification
            toast.innerText = slangText;
            toast.classList.remove('hidden');
            
            // Spawn emojis relative to click
            spawnConfetti(e.clientX, e.clientY);
            
            // Reset animation
            toast.style.animation = 'none';
            toast.offsetHeight; // Trigger reflow
            toast.style.animation = 'popToast 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';

            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                toast.classList.add('hidden');
            }, 2000);
        });
    });

    // 6. CLICK SCREEN TO SPAWN FIREWORK
    window.addEventListener('click', (e) => {
        // Don't spawn if click on interactive elements
        if (e.target.closest('.card-panel') || e.target.closest('.music-widget') || e.target.closest('.sticker-dock') || e.target.closest('.gate-card')) {
            return;
        }
        if (!welcomeGate.classList.contains('hidden')) return; // Don't trigger during welcome screen
        
        createFirework(e.clientX, e.clientY);
    });
});

// ================= EFFECT GENERATORS =================

// EMOJI RAIN GENERATOR
const emojis = ['🎈', '🎉', '🎂', '✨', '💖', '👑', '🔥', '💅', '🥳', '😎', '🍭', '🦄'];
function startEmojiRain() {
    setInterval(() => {
        const emoji = document.createElement('div');
        emoji.classList.add('floating-emoji');
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random placement parameters
        const startX = Math.random() * 100;
        const endX = startX + (Math.random() * 20 - 10); // slight drift
        const duration = 5 + Math.random() * 5; // 5 to 10s
        const fontSize = 1.2 + Math.random() * 1.8; // 1.2rem to 3rem
        const rot = Math.random() * 360 - 180;
        
        emoji.style.setProperty('--start-x', startX + 'vw');
        emoji.style.setProperty('--end-x', endX + 'vw');
        emoji.style.setProperty('--rot-deg', rot + 'deg');
        emoji.style.fontSize = fontSize + 'rem';
        emoji.style.animationDuration = duration + 's';
        
        document.body.appendChild(emoji);
        
        // Cleanup element after animation ends
        setTimeout(() => {
            emoji.remove();
        }, duration * 1000);
    }, 400);
}

// HTML5 CANVAS FIREWORK SYSTEM
let canvas, ctx;
let particles = [];
let fireworkTimers = [];

function initFireworks() {
    canvas = document.getElementById('fireworks-canvas');
    ctx = canvas.getContext('2d');
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    requestAnimationFrame(animate);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 2.5 + 1;
        
        // Random velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        this.gravity = 0.08;
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
    }
    
    update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
    }
}

function createFirework(x, y) {
    const colors = ['#ff2a5f', '#05d9e8', '#9d4edd', '#f5b041', '#2ecc71', '#e74c3c'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < 45; i++) {
        particles.push(new Particle(x, y, randomColor));
    }
}

function animate() {
    // Clear with transparent black for trailing effect
    ctx.fillStyle = 'rgba(15, 12, 27, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animate);
}

// Helper to spawn smaller burst of confetti particles
function spawnConfetti(x, y) {
    createFirework(x, y);
}

// Special Blast when opening card
function triggerInitialBlast() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    createFirework(width * 0.2, height * 0.3);
    createFirework(width * 0.8, height * 0.3);
    
    setTimeout(() => {
        createFirework(width * 0.5, height * 0.4);
    }, 400);
}

// Special Blast when all candles blown out
function triggerMassiveBlast() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    let count = 0;
    const interval = setInterval(() => {
        const randomX = Math.random() * width;
        const randomY = Math.random() * (height * 0.6);
        createFirework(randomX, randomY);
        count++;
        
        if (count > 15) {
            clearInterval(interval);
        }
    }, 250);
}
