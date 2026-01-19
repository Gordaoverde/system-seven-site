// Ativa modo JS
document.documentElement.classList.add('js');

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

const track = document.querySelector('.equipe-track');
const cards = document.querySelectorAll('.equipe-card');
const prevBtn = document.querySelector('.equipe-btn.prev');
const nextBtn = document.querySelector('.equipe-btn.next');

let index = 0;
let autoPlayInterval;

/* Quantos cards cabem na tela */
function getCardsPerView() {
    return window.innerWidth <= 768 ? 1 : 2;
}

/* Atualiza posição */
function updateCarousel() {
    const cardWidth = cards[0].offsetWidth;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
}

/* Próximo */
function nextSlide() {
    const maxIndex = cards.length - getCardsPerView();
    index++;

    if (index > maxIndex) {
        index = 0;
    }

    updateCarousel();
}

/* Anterior */
function prevSlide() {
    const maxIndex = cards.length - getCardsPerView();
    index--;

    if (index < 0) {
        index = maxIndex;
    }

    updateCarousel();
}

/* Botões */
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

/* AUTOPLAY */
function startAutoplay() {
    autoPlayInterval = setInterval(nextSlide, 4000);
}

function stopAutoplay() {
    clearInterval(autoPlayInterval);
}

/* Pausa no hover */
track.addEventListener('mouseenter', stopAutoplay);
track.addEventListener('mouseleave', startAutoplay);

/* Ajusta no resize */
window.addEventListener('resize', () => {
    index = 0;
    updateCarousel();
});

/* Inicia */
startAutoplay();