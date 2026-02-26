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
   CHATBOT SYSTEM SEVEN PRO
======================= */

document.addEventListener('DOMContentLoaded', () => {

    const chatToggle = document.getElementById('chat-toggle');
    const chatBot = document.getElementById('chatbot');
    const chatClose = document.getElementById('chat-close');
    const chatBody = document.getElementById('chat-body');

    const whatsapp = 'https://wa.me/553198023414?text=';
    let userName ='';
    let soundUnlocked = false;

    /* ===== SOM ===== */
    function unlockSound() {
        const sound = document.getElementById('chat-sound');
        if (!sound || soundUnlocked) return;

        sound.play().then(() => {
            sound.pause();
            sound.currentTime = 0;
            soundUnlocked = true;
        }).catch(() => {});
    }

    function playChatSound() {
        if (!soundUnlocked) return;
        const sound = document.getElementById('chat-sound');
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {});
        }
    }

    if (!chatToggle || !chatBot) return;

    chatToggle.onclick = () => {
        unlockSound(); // 🔓 DESBLOQUEIA NO CLIQUE
        chatBot.classList.add('active');
        if (!chatBody.innerHTML) startChat();
    };

    chatClose.onclick = () => chatBot.classList.remove('active');

    function isBusinessHours() {
        const hour = new Date().getHours();
        return hour >= 9 && hour < 18;
    }

    /* ===== DIGITANDO ===== */
    function botTyping(cb) {
        const typing = document.createElement('div');
        typing.className = 'chat-message bot typing';
        typing.innerText = 'Digitando...';
        chatBody.appendChild(typing);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            typing.remove();
            cb();
        }, 900);
    }

    function bot(text, callback) {
        clearOptions(); // 👈 GARANTE ORDEM VISUAL
        botTyping(() => {
            const msg = document.createElement('div');
            msg.className = 'chat-message bot';
            msg.innerText = text;
            chatBody.appendChild(msg);
            playChatSound();
            chatBody.scrollTop = chatBody.scrollHeight;

            if (callback) callback();
        });
    }

    /* ===== OPÇÕES ===== */
    function options(list) {
        const box = document.createElement('div');
        box.className = 'chat-options';

        list.forEach((o, i) => {
            const btn = document.createElement('button');
            btn.className = 'chat-option';
            btn.innerText = o.text;
            btn.style.animationDelay = `${i * 0.08}s`;
            btn.onclick = o.action;
            box.appendChild(btn);
        });

        chatBody.appendChild(box);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function clearOptions() {
        document.querySelectorAll('.chat-options').forEach(e => e.remove());
    }

    function openWA(msg) {
        window.open(whatsapp + encodeURIComponent(msg), '_blank');
    }

    function startChat() {
        if (!userName) {
            bot('Olá! 👋 Qual é o seu nome?', askName);
        } else {
            mainMenu();
        }
    }

    function askName() {
        const wrapper = document.createElement('div');
        wrapper.className = 'chat-name-wrapper';

        const input = document.createElement('input');
        input.placeholder = 'Digite seu nome...';
        input.className = 'chat-input-name';
        input.type = 'text';

        const btn = document.createElement('button');
        btn.innerText = 'Enviar';
        btn.className = 'chat-send-name';

        function submitName() {
            if (!input.value.trim()) return;

            userName = input.value.trim();
            wrapper.remove();

            bot(`Prazer, ${userName}! 😊`, () => {
                mainMenu();
            });
        }

        // Enter no desktop e mobile
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') submitName();
        });

        // Clique no botão (mobile)
        btn.onclick = submitName;

        wrapper.appendChild(input);
        wrapper.appendChild(btn);
        chatBody.appendChild(wrapper);

        input.focus();
    }

    /* ===== MENUS ===== */

    function mainMenu() {
        bot(`Como posso te ajudar${userName ? ', ' + userName : ''}?`, () => {
            options([
                { text: '🌐 Criar site', action: siteMenu },
                { text: '🖥️ Desenvolver sistema', action: systemMenu },
                { text: '💰 Solicitar orçamento', action: budgetMenu },
                { text: '📲 Falar no WhatsApp', action: () =>
                    openWA(`Olá! Meu nome é ${userName} e gostaria de falar com um especialista da System Seven.`)
                }
            ]);
        });
    }

    function siteMenu() {
        bot('Nos explique melhor como quer seu site:', () => {
            options([
                { text: '📰 Site informativo', action: () => openWA(`Olá! Sou ${userName} e quero um site informativo.`) },
                { text: '🏢 Site empresarial', action: () => openWA(`Olá! Sou ${userName} e quero um site empresarial.`) },
                { text: '⚙️ Site complexo', action: () => openWA(`Olá! Sou ${userName} e preciso de um site complexo.`) },
                { text: '⬅️ Voltar', action: mainMenu }
            ]);
        });
    }

    function systemMenu() {
        bot('Qual tipo de sistema você precisa?', () => {
            options([
                { text: '📞 Sistema de atendimento', action: () => openWA(`Olá! Sou ${userName} e preciso de um sistema de atendimento.`) },
                { text: '💳 Sistema de cobrança', action: () => openWA(`Olá! Sou ${userName} e preciso de um sistema de cobrança.`) },
                { text: '🧾 Sistema de orçamento', action: () => openWA(`Olá! Sou ${userName} e preciso de um sistema de orçamento.`) },
                { text: '⚙️ Outro tipo de sistema', action: () => openWA(`Olá! Sou ${userName} e preciso de um sistema personalizado.`) },
                { text: '⬅️ Voltar', action: mainMenu }
            ]);
        });
    }

    function budgetMenu() {
        bot(
            isBusinessHours()
                ? 'Estamos em horário comercial 👍 Qual orçamento deseja?'
                : 'Estamos fora do horário comercial 😴 Mas pode deixar sua solicitação!',
            () => {
                options([
                    { text: '🌐 Site', action: siteMenu },
                    { text: '🖥️ Sistema', action: systemMenu },
                    { text: '⬅️ Voltar', action: mainMenu }
                ]);
            }
        );
    }
});

/* =========================
   ATIVA DIA DA MULHER AGORA
========================= */

document.addEventListener("DOMContentLoaded", () => {

    // Ativa classe especial
    document.body.classList.add("womens-day-active");

    // Mostra banner
    const banner = document.getElementById("womens-day-banner");
    if (banner) banner.style.display = "block";

    // Adiciona mensagem no hero
    const hero = document.querySelector(".hero");
    if (hero) {
        const msg = document.createElement("p");
        msg.className = "womens-day-message";
        msg.innerText = "Está chegando o dia em que celebramos todas as mulheres que constroem, lideram e inovam. 💜";
        hero.appendChild(msg);
    }


});
