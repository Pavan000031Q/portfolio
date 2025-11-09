document.addEventListener("DOMContentLoaded", () => {
    if (typeof portfolioData !== 'undefined') {
        document.getElementById('header-logo').textContent = portfolioData.header.logo;
        document.getElementById('header-name').textContent = portfolioData.header.name;

        document.getElementById('hero-subtitle').textContent = portfolioData.hero.subtitle;
        document.getElementById('hero-title').textContent = portfolioData.hero.title;
        document.getElementById('project-heading').textContent = portfolioData.hero.projectHeading;

        document.getElementById('about-title').textContent = portfolioData.about.title;
        document.getElementById('about-description').textContent = portfolioData.about.description;

        const socialLinks = document.querySelectorAll('.social-links a');
        socialLinks.forEach((link, index) => {
            link.href = portfolioData.socials[index].url;
            link.setAttribute('aria-label', portfolioData.socials[index].name);
        });

        document.getElementById('mobile-card-img').src = portfolioData.mobileCardImage;
    }

    const allCards = gsap.utils.toArray(".card");
    const taglineEl = document.getElementById('hero-tagline');

    function updateProjectName() {
        const centerCard = allCards.find(card => card.posIndex === 5);
        if (!centerCard) return;

        const cardId = parseInt(centerCard.id.split('-')[1]);
        const project = portfolioData.projects.find(p => p.id === cardId);

        if (project && taglineEl) {
            if (taglineEl.textContent === project.name) return;

            const tl = gsap.timeline();
            tl.to(taglineEl, { opacity: 0, y: 10, duration: 0.2, ease: "power1.in" })
              .call(() => { taglineEl.textContent = project.name; })
              .to(taglineEl, { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" });
        }
    }

    const desktopCardPositions = [
        { x: -500, y: 100, rotation: -200, zIndex: 0, scale: 0.7, opacity: 0 },
        { x: -360, y: 250, rotation: -140, zIndex: 1, scale: 1, opacity: 1 },
        { x: -320, y: 220, rotation: -100, zIndex: 2, scale: 1, opacity: 1 },
        { x: -280, y: 120, rotation: -70,  zIndex: 3, scale: 1, opacity: 1 },
        { x: -180, y: 50,  rotation: -30,  zIndex: 4, scale: 1, opacity: 1 },
        { x: 0,    y: -20,   rotation: 0,    zIndex: 5, scale: 1.02, opacity: 1 },
        { x: 180,  y: 50,  rotation: 30,   zIndex: 6, scale: 1, opacity: 1 },
        { x: 280,  y: 120, rotation: 70,   zIndex: 7, scale: 1, opacity: 1 },
        { x: 320,  y: 220, rotation: 100,  zIndex: 8, scale: 1, opacity: 1 },
        { x: 350, y: 300, rotation: 140, zIndex: 9, scale: 0.7, opacity: 0 },
    ];

    const MobileCardPositions = [
        { x: -500, y: 100, rotation: -200, zIndex: 0, scale: 0.7, opacity: 0 },
        { x: -500, y: 100, rotation: -140, zIndex: 1, scale: 0.8, opacity: 0 },
        { x: -250, y: 110, rotation: -90, zIndex: 2, scale: 0.8, opacity: 1 },
        { x: -220, y: 80, rotation: -60,  zIndex: 3, scale: 0.8, opacity: 1 },
        { x: -150, y: 10,  rotation: -25,  zIndex: 4, scale: 0.9, opacity: 1 },
        { x: 0,    y: -20, rotation: 0,    zIndex: 5, scale: 1.0, opacity: 1 },
        { x: 150,  y: 10,  rotation: 25,   zIndex: 6, scale: 0.9, opacity: 1 },
        { x: 220,  y: 80, rotation: 60,   zIndex: 7, scale: 0.8, opacity: 1 },
        { x: 250,  y: 120, rotation: 90,  zIndex: 8, scale: 0.8, opacity: 1 },
        { x: 500,  y: 100, rotation: 140,  zIndex: 9, scale: 0.7, opacity: 0 },
    ];

    const tabletCardPositions = [
        { x: -500, y: 100, rotation: -200, zIndex: 0, scale: 0.7, opacity: 0 },
        { x: -500, y: 100, rotation: -140, zIndex: 1, scale: 0.8, opacity: 0 },
        { x: -550, y: 250, rotation: -90, zIndex: 2, scale: 0.8, opacity: 1 },
        { x: -450, y: 220, rotation: -60,  zIndex: 3, scale: 0.8, opacity: 1 },
        { x: -260, y: 50,  rotation: -25,  zIndex: 4, scale: 0.9, opacity: 1 },
        { x: 0,    y: -20, rotation: 0,    zIndex: 5, scale: 1.0, opacity: 1 },
        { x: 260,  y: 50,  rotation: 25,   zIndex: 6, scale: 0.9, opacity: 1 },
        { x: 450,  y: 220, rotation: 60,   zIndex: 7, scale: 0.8, opacity: 1 },
        { x: 550,  y: 250, rotation: 90,  zIndex: 8, scale: 0.8, opacity: 1 },
        { x: 500,  y: 100, rotation: 140,  zIndex: 9, scale: 0.7, opacity: 0 },
    ];


    let cardPositions = desktopCardPositions;
    const tabletMediaQuery = window.matchMedia("(max-width: 1024px)");
    const mobileMediaQuery = window.matchMedia("(max-width: 768px)");
    function handleScreenChange() {
        if (mobileMediaQuery.matches) {
            cardPositions = MobileCardPositions;
        } else if (tabletMediaQuery.matches) {
            cardPositions = tabletCardPositions;
        } else {
            cardPositions = desktopCardPositions;
        }
    }
    tabletMediaQuery.addEventListener('change', handleScreenChange);
    mobileMediaQuery.addEventListener('change', handleScreenChange);
    handleScreenChange();

    const fallDuration = 3.5;
    const pause = 0.5;
    const expandDuration = 1.0;
    const expandDelay = fallDuration + pause;

    gsap.set(allCards, {
        y: -2500,
        opacity: 0,
        visibility: "visible"
    });

    gsap.to(allCards, {
        y: 0, 
        opacity: 1, 
        duration: fallDuration, 
        ease: "power3.out", 
        stagger: 0.05
    });

    if (typeof portfolioData !== 'undefined') {
        allCards.forEach(card => {
            const cardId = parseInt(card.id.split('-')[1]);
            const project = portfolioData.projects.find(p => p.id === cardId);
            if (project) card.style.backgroundImage = `url('${project.image}')`;
        });
    }

    const initialAnimation = gsap.timeline({
        onComplete: () => {
            updateProjectName();
            gsap.delayedCall(1, animateCards);
        }
    });

    allCards.forEach(card => {
        const cardId = parseInt(card.id.split('-')[1]);
        let posIndex;
        if (cardId === 9) { posIndex = 0; }
        else if (cardId === 10) { posIndex = 9; }
        else { posIndex = cardId; }
        card.posIndex = posIndex;
        initialAnimation.to(card, { ...cardPositions[posIndex], duration: expandDuration, ease: "power4.inOut", delay: expandDelay }, 0);
    });

    function animateCards() {
        const tl = gsap.timeline({
            onComplete: () => {
                updateProjectName();
                gsap.delayedCall(1, animateCards);
            }
        });

        allCards.forEach(card => {
            card.posIndex = (card.posIndex - 1 + cardPositions.length) % cardPositions.length;
            const newPos = cardPositions[card.posIndex];
            
            tl.to(card, { ...newPos, duration: 1.0, ease: "power2.inOut" }, 0);
        });
    }
});