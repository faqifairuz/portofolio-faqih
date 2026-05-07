/* 3D Portfolio — Enhanced Script */

// ===== MOUSE TRAIL EFFECT =====
const trailCanvas = document.getElementById('trailCanvas');
if (trailCanvas) {
    const tCtx = trailCanvas.getContext('2d');
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
    const trail = [];
    const maxTrail = 30;

    document.addEventListener('mousemove', e => {
        trail.push({ x: e.clientX, y: e.clientY, life: 1 });
        if (trail.length > maxTrail) trail.shift();
    });

    function drawTrail() {
        tCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        for (let i = 0; i < trail.length; i++) {
            const p = trail[i];
            p.life -= 0.025;
            if (p.life <= 0) { trail.splice(i, 1); i--; continue; }
            tCtx.beginPath();
            tCtx.arc(p.x, p.y, p.life * 4, 0, Math.PI * 2);
            tCtx.fillStyle = `rgba(124, 58, 237, ${p.life * 0.4})`;
            tCtx.fill();
        }
        requestAnimationFrame(drawTrail);
    }
    drawTrail();
    window.addEventListener('resize', () => { trailCanvas.width = window.innerWidth; trailCanvas.height = window.innerHeight; });
}

// ===== CUSTOM CURSOR =====
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mX = 0, mY = 0, rX = 0, rY = 0;

document.addEventListener('mousemove', e => {
    mX = e.clientX; mY = e.clientY;
    if (cursorDot) { cursorDot.style.left = mX - 4 + 'px'; cursorDot.style.top = mY - 4 + 'px'; }
});

function animCursor() {
    rX += (mX - rX) * 0.15; rY += (mY - rY) * 0.15;
    if (cursorRing) { cursorRing.style.left = rX - 20 + 'px'; cursorRing.style.top = rY - 20 + 'px'; }
    requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('a,button,.btn,.magnetic-btn,.skill-card,.project-card,.cert-card,.social-btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('hover'));
});

// ===== SCROLL PROGRESS =====
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const h = document.documentElement;
    if (scrollProgress) scrollProgress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => { if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50); });
if (burger) burger.addEventListener('click', () => { navLinks.classList.toggle('nav-active'); burger.classList.toggle('toggle'); });
document.querySelectorAll('#navLinks a').forEach(l => l.addEventListener('click', () => { navLinks.classList.remove('nav-active'); burger.classList.remove('toggle'); }));

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const d = e.target.dataset.delay || 0;
            setTimeout(() => e.target.classList.add('active'), d);
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal-up').forEach(el => revealObs.observe(el));

// ===== COUNTER ANIMATION =====
const cObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const el = e.target, t = parseInt(el.dataset.count);
            let c = 0; const s = Math.ceil(t / 40);
            const ti = setInterval(() => { c += s; if (c >= t) { c = t; clearInterval(ti); } el.textContent = c; }, 40);
            cObs.unobserve(el);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number').forEach(el => cObs.observe(el));

// ===== 3D TILT CARDS =====
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        const rx = ((y - r.height / 2) / (r.height / 2)) * -10;
        const ry = ((x - r.width / 2) / (r.width / 2)) * 10;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        card.style.transition = 'transform 0.08s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        card.style.transition = 'transform 0.5s ease';
    });
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
});

// ===== THREE.JS — HERO PARTICLE GALAXY =====
(function () {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const ren = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    ren.setSize(canvas.clientWidth, canvas.clientHeight);
    ren.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const count = 4500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
        new THREE.Color(0x7c3aed), new THREE.Color(0x3b82f6),
        new THREE.Color(0x06b6d4), new THREE.Color(0x8b5cf6),
        new THREE.Color(0xf59e0b), new THREE.Color(0xec4899),
    ];

    for (let i = 0; i < count; i++) {
        const r = Math.random() * 6 + 0.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const spin = theta + r * 0.6;
        pos[i * 3] = r * Math.sin(phi) * Math.cos(spin);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(spin);
        pos[i * 3 + 2] = r * Math.cos(phi);
        const c = palette[Math.floor(Math.random() * palette.length)];
        col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({ size: 0.03, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);

    // Add inner ring of particles
    const ringCount = 1500;
    const ringPos = new Float32Array(ringCount * 3);
    const ringCol = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
        const angle = (i / ringCount) * Math.PI * 2;
        const r = 2.5 + Math.random() * 0.5;
        ringPos[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * 0.3;
        ringPos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
        ringPos[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 0.3;
        const c = palette[Math.floor(Math.random() * palette.length)];
        ringCol[i * 3] = c.r; ringCol[i * 3 + 1] = c.g; ringCol[i * 3 + 2] = c.b;
    }
    const ringGeo = new THREE.BufferGeometry();
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
    ringGeo.setAttribute('color', new THREE.BufferAttribute(ringCol, 3));
    const ringMat = new THREE.PointsMaterial({ size: 0.025, vertexColors: true, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false });
    const ringPts = new THREE.Points(ringGeo, ringMat);
    scene.add(ringPts);

    cam.position.z = 4.5;

    let tRX = 0, tRY = 0;
    document.addEventListener('mousemove', e => {
        tRX = (e.clientY / window.innerHeight - 0.5) * 0.5;
        tRY = (e.clientX / window.innerWidth - 0.5) * 0.5;
    });

    function anim() {
        requestAnimationFrame(anim);
        pts.rotation.y += 0.0012;
        pts.rotation.x += (tRX - pts.rotation.x) * 0.02;
        pts.rotation.y += (tRY - pts.rotation.y) * 0.02;
        ringPts.rotation.y -= 0.003;
        ringPts.rotation.x = Math.sin(Date.now() * 0.0003) * 0.3;
        ren.render(scene, cam);
    }
    anim();

    window.addEventListener('resize', () => {
        cam.aspect = canvas.clientWidth / canvas.clientHeight;
        cam.updateProjectionMatrix();
        ren.setSize(canvas.clientWidth, canvas.clientHeight);
    });
})();

// ===== THREE.JS — CONTACT 3D ORB =====
(function () {
    const canvas = document.getElementById('contactCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const ren = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    ren.setSize(canvas.clientWidth, canvas.clientHeight);
    ren.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const s1 = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.2, 2),
        new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.12 })
    );
    scene.add(s1);

    const s2 = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.6, 3),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.08 })
    );
    scene.add(s2);

    const s3 = new THREE.Mesh(
        new THREE.TorusGeometry(2.8, 0.02, 16, 100),
        new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.15 })
    );
    s3.rotation.x = Math.PI / 2.5;
    scene.add(s3);

    const pC = 600;
    const pP = new Float32Array(pC * 3);
    for (let i = 0; i < pC; i++) {
        pP[i * 3] = (Math.random() - 0.5) * 10;
        pP[i * 3 + 1] = (Math.random() - 0.5) * 10;
        pP[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const pG = new THREE.BufferGeometry();
    pG.setAttribute('position', new THREE.BufferAttribute(pP, 3));
    const pM = new THREE.PointsMaterial({ size: 0.02, color: 0x7c3aed, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });
    scene.add(new THREE.Points(pG, pM));

    cam.position.z = 5;

    let oX = 0, oY = 0;
    const cs = document.getElementById('contact');
    if (cs) cs.addEventListener('mousemove', e => {
        const r = cs.getBoundingClientRect();
        oX = ((e.clientY - r.top) / r.height - 0.5) * 0.6;
        oY = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
    });

    function anim() {
        requestAnimationFrame(anim);
        s1.rotation.y += 0.003; s1.rotation.x += 0.001;
        s2.rotation.y -= 0.004; s2.rotation.x -= 0.002;
        s3.rotation.z += 0.002;
        s1.rotation.x += (oX - s1.rotation.x) * 0.01;
        s1.rotation.y += (oY - s1.rotation.y) * 0.01;
        ren.render(scene, cam);
    }
    anim();

    window.addEventListener('resize', () => {
        cam.aspect = canvas.clientWidth / canvas.clientHeight;
        cam.updateProjectionMatrix();
        ren.setSize(canvas.clientWidth, canvas.clientHeight);
    });
})();
