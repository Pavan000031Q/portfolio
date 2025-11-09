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
    const projectHeadingEl = document.getElementById('project-heading');

    function updateProjectName() {
        const centerCard = allCards.find(card => card.posIndex === 5);
        if (!centerCard) return;

        const cardId = parseInt(centerCard.id.split('-')[1]);
        const project = portfolioData.projects.find(p => p.id === cardId);

        // Determine the correct heading based on the card's ID
        let headingText = '';
        const projectIds = [5, 6, 7, 8];
        const skillIds = [1, 2, 9, 10];
        const aboutId = 3;
        const contactId = 4;

        if (projectIds.includes(cardId)) {
            headingText = "My Projects";
        } else if (skillIds.includes(cardId)) {
            headingText = "Skills";
        } else if (cardId === aboutId) {
            headingText = "About Me";
        } else if (cardId === contactId) {
            headingText = "Contact Me";
        }

        // Animate the heading change
        if (projectHeadingEl && projectHeadingEl.textContent !== headingText) {
            gsap.to(projectHeadingEl, { opacity: 0, y: -10, duration: 0.2, ease: "power1.in", onComplete: () => {
                projectHeadingEl.textContent = headingText;
                gsap.to(projectHeadingEl, { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" });
            }});
        }

        // Animate the tagline (card name) change
        if (project && taglineEl) {
            if (taglineEl.textContent === project.name) return;

            gsap.to(taglineEl, { opacity: 0, y: 10, duration: 0.2, ease: "power1.in", onComplete: () => {
                taglineEl.textContent = project.name;
                gsap.to(taglineEl, { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" });
            }});
        }
    }

    const desktopCardPositions = [
        { x: -500, y: 100, rotation: -200, zIndex: 0, scale: 0.7, opacity: 0 },
        { x: -360, y: 250, rotation: -140, zIndex: 1, scale: 1, opacity: 1 },
        { x: -320, y: 220, rotation: -100, zIndex: 2, scale: 1, opacity: 1 },
        { x: -280, y: 120, rotation: -70,  zIndex: 3, scale: 1, opacity: 1 },
        { x: -180, y: 50,  rotation: -30,  zIndex: 4, scale: 1, opacity: 1 },
        { x: 0,    y: -20,   rotation: 0,    zIndex: 5, scale: 1.1, opacity: 1 },
        { x: 180,  y: 50,  rotation: 30,   zIndex: 6, scale: 1, opacity: 1 },
        { x: 280,  y: 120, rotation: 70,   zIndex: 7, scale: 1, opacity: 1 },
        { x: 320,  y: 220, rotation: 100,  zIndex: 8, scale: 1, opacity: 1 },
        { x: 350, y: 300, rotation: 140, zIndex: 9, scale: 0.7, opacity: 0 },
    ];

    const MobileCardPositions = [
        { x: -500, y: 100, rotation: -200, zIndex: 0, scale: 0.7, opacity: 0 },
        { x: -300, y: 100, rotation: -140, zIndex: 1, scale: 0.8, opacity: 0 }, // Hide this card
        { x: -250, y: 110, rotation: -90, zIndex: 2, scale: 0.8, opacity: 1 }, // Was -250
        { x: -220, y: 80, rotation: -60,  zIndex: 3, scale: 0.8, opacity: 1 }, // Was -220
        { x: -150, y: 10,  rotation: -25,  zIndex: 4, scale: 0.9, opacity: 1 },
        { x: 0,    y: -20, rotation: 0,    zIndex: 5, scale: 1.1, opacity: 1 },
        { x: 150,  y: 10,  rotation: 25,   zIndex: 6, scale: 0.9, opacity: 1 },
        { x: 220,  y: 80, rotation: 60,   zIndex: 7, scale: 0.8, opacity: 1 }, // Was 220
        { x: 250,  y: 120, rotation: 90,  zIndex: 8, scale: 0.8, opacity: 1 }, // Was 250
        { x: 300,  y: 100, rotation: 140,  zIndex: 9, scale: 0.7, opacity: 0 }, // Hide this card
    ];

    const tabletCardPositions = [
        { x: -500, y: 100, rotation: -200, zIndex: 0, scale: 0.7, opacity: 0 },
        { x: -500, y: 100, rotation: -140, zIndex: 1, scale: 0.8, opacity: 0 },
        { x: -550, y: 250, rotation: -90, zIndex: 2, scale: 0.8, opacity: 1 },
        { x: -450, y: 220, rotation: -60,  zIndex: 3, scale: 0.8, opacity: 1 },
        { x: -260, y: 50,  rotation: -25,  zIndex: 4, scale: 0.9, opacity: 1 },
        { x: 0,    y: -20, rotation: 0,    zIndex: 5, scale: 1.1, opacity: 1 },
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

    const fallDuration = 3;
    const pause = 0.5;
    const expandDuration = 1.3;
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
        initialAnimation.to(card, { 
            ...cardPositions[posIndex], 
            duration: expandDuration, 
            ease: "power4.inOut",
            force3D: true, // Performance optimization
            // Shadow is removed from here to ensure it's not present during initial expansion
            delay: expandDelay 
        }, 0);
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
            
            const tweenProps = {
                ...newPos, 
                duration: 1.3, 
                ease: "power2.inOut",
                force3D: true // Performance optimization
            };

            // Only add box-shadow on non-mobile devices for performance
            if (!mobileMediaQuery.matches) {
                tweenProps.boxShadow = "0 30px 60px -15px rgba(0, 0, 0, 0.35)";
            }
            tl.to(card, tweenProps, 0);
        });
    }
});