// app.animation.js
export function initializeAnimations() {
    const sr = ScrollReveal({
        reset: true,
        distance: '80px',
        duration: 2000,
        delay: 200,
    });

    sr.reveal('.home-component, .heading', { origin: 'top' });
}
