const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });
}

// Typing Effect for Subtitle
const typingEffect = () => {
    const text = "FRONTEND DEV // BACKEND SYS // CYBER ENTHUSIAST";
    const speed = 100;
    let i = 0;
    const target = document.querySelector('.typing-text');
    
    target.innerHTML = '';

    function typeWriter() {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start typing after a short delay (simulating boot sequence)
    setTimeout(typeWriter, 1000);
}

// Initialize
navSlide();
window.onload = typingEffect;
