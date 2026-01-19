// Ativa modo JS
document.documentElement.classList.add('js');

/* =======================
   REVEAL ON SCROLL
======================= */
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* =======================
   CARROSSEL EQUIPE
======================= */
const track = document.querySelector('.equipe-track');
const cards = document.querySelectorAll('.equipe-card');
const prevBtn = document.querySelector('.equipe-btn.prev');
const nextBtn = document.querySelector('.equipe-btn.next');

let index = 0;
let autoPlayInterval;

function getCardsPerView() {
    return window.innerWidth <= 768 ? 1 : 2;
}

function updateCarousel() {
    if (!cards.length) return;
    const cardWidth = cards[0].offsetWidth;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
}

function nextSlide() {
    const maxIndex = cards.length - getCardsPerView();
    index++;

    if (index > maxIndex) index = 0;
    updateCarousel();
}

function prevSlide() {
    const maxIndex = cards.length - getCardsPerView();
    index--;

    if (index < 0) index = maxIndex;
    updateCarousel();
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
}

function startAutoplay() {
    autoPlayInterval = setInterval(nextSlide, 4000);
}

function stopAutoplay() {
    clearInterval(autoPlayInterval);
}

if (track) {
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);
}

window.addEventListener('resize', () => {
    index = 0;
    updateCarousel();
});

startAutoplay();

/* =======================
   FAQ
======================= */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    }
});

/* =======================
   PARTICLES
======================= */
const canvas = document.getElementById("particles");

if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    const maxParticles = 70;

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
        }

        move() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.6)";
            ctx.fill();
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.strokeStyle = "rgba(255,255,255,0.1)";
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.move();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }
    }

    initParticles();
    animateParticles();
}

/* =======================
   MICROINTERAÇÕES TOUCH
======================= */
const touchCards = document.querySelectorAll('.card');

touchCards.forEach(card => {
    card.addEventListener('touchstart', () => {
        card.classList.add('touched');
    });

    card.addEventListener('touchend', () => {
        setTimeout(() => {
            card.classList.remove('touched');
        }, 150);
    });
});

/* =======================
   WHATSAPP FLUTUANTE (FINAL)
======================= */
const whatsappBtn = document.querySelector('.whatsapp-float');
const footer = document.querySelector('footer');

function handleWhatsappVisibility() {
    if (!whatsappBtn || !footer) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const footerTop = footer.offsetTop;

    // Mostra após rolar
    if (scrollY > 300) {
        whatsappBtn.classList.add('show');
    } else {
        whatsappBtn.classList.remove('show');
    }

    // Esconde somente ao chegar no footer
    if (scrollY + windowHeight >= footerTop - 100) {
        whatsappBtn.classList.add('hide');
    } else {
        whatsappBtn.classList.remove('hide');
    }
}

window.addEventListener('scroll', handleWhatsappVisibility);
window.addEventListener('load', handleWhatsappVisibility);

window.addEventListener('load', () => {
    const btn = document.querySelector('.whatsapp-float');
    console.log('Botão:', btn);

    if (btn) {
        btn.classList.add('show');
    }
});
