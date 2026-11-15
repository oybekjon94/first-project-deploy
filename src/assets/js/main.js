// Mobile menu open / close
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');

function setMenu(open) {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
}

toggle.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// Fade in sections when they scroll into view
const onScroll = document.querySelectorAll('.on-scroll');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px' });

    onScroll.forEach(el => revealObserver.observe(el));
} else {
    onScroll.forEach(el => el.classList.add('is-visible'));
}

// Work page: filter project cards by category
const filterButtons = document.querySelectorAll('[data-filter]');

filterButtons.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.filter;

    filterButtons.forEach(b => b.setAttribute('aria-pressed', b === button));
    document.querySelectorAll('.project-card').forEach(card => {
        card.hidden = key !== 'all' && !card.dataset.categories.split(' ').includes(key);
    });
}));

// Contact form: open the visitor's email app with the message filled in
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const data = new FormData(contactForm);
        const subject = `${contactForm.dataset.subject} ${data.get('name')}`;
        const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`;

        window.location.href = `mailto:${contactForm.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

// Case study "Back" button: go back to where the visitor came from (e.g. the home page or the Work page);
// the link itself points to the Work page for visitors who arrived directly
const backButton = document.querySelector('[data-back]');

if (backButton) {
    backButton.addEventListener('click', e => {
        const cameFromSite = document.referrer && new URL(document.referrer).origin === location.origin;

        if (cameFromSite && history.length > 1) {
            e.preventDefault();
            history.back();
        }
    });
}

// Case study "Contents": mark the section that is currently being read
const tocLinks = document.querySelectorAll('.case-toc a');

if (tocLinks.length && 'IntersectionObserver' in window) {
    const setActive = id => tocLinks.forEach(link => {
        if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
    });

    // A section counts as "being read" when it crosses the upper part of the screen
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px' });

    document.querySelectorAll('.case-section').forEach(section => sectionObserver.observe(section));
    setActive(tocLinks[0].getAttribute('href').slice(1));
}

// Case study images: click to see the full-size image in an overlay (without JS the link opens the image file)
const zoomLinks = document.querySelectorAll('a.zoom');

if (zoomLinks.length && typeof HTMLDialogElement === 'function') {
    const lightbox = document.createElement('dialog');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<button type="button" class="lightbox-close" aria-label="' + zoomLinks[0].dataset.close + '">×</button><img alt="">';
    document.body.append(lightbox);

    const lightboxImage = lightbox.querySelector('img');

    zoomLinks.forEach(link => link.addEventListener('click', e => {
        e.preventDefault();
        lightboxImage.src = link.href;
        lightboxImage.alt = link.dataset.alt;
        lightbox.showModal();
    }));

    // A click anywhere (or Esc) closes it
    lightbox.addEventListener('click', () => lightbox.close());
}

// Case study TLDR: show one question card at a time, with a counter and previous / next buttons
document.querySelectorAll('[data-tldr]').forEach(box => {
    const slides = [...box.querySelectorAll('.tldr-slide')];
    const prev = box.querySelector('[data-tldr-prev]');
    const next = box.querySelector('[data-tldr-next]');
    const current = box.querySelector('[data-tldr-current]');
    let index = 0;

    function show(i) {
        index = Math.max(0, Math.min(slides.length - 1, i));
        slides.forEach((slide, n) => slide.classList.toggle('is-active', n === index));
        current.textContent = String(index + 1).padStart(2, '0');
        prev.disabled = index === 0;
        next.disabled = index === slides.length - 1;
    }

    prev.addEventListener('click', () => show(index - 1));
    next.addEventListener('click', () => show(index + 1));
    show(0);
});

// Back to top button: shows once the page reaches the section named in data-show-at (e.g. "outcome"),
// or after 700px of scrolling when that section doesn't exist; jumps (smoothly) to the top of the page
const toTop = document.querySelector('[data-to-top]');

if (toTop) {
    const showAt = document.getElementById(toTop.dataset.showAt);
    const update = () => {
        const reached = showAt
            ? showAt.getBoundingClientRect().top < window.innerHeight * 0.6
            : window.scrollY > 700;

        toTop.classList.toggle('is-visible', reached);
    };

    window.addEventListener('scroll', update, { passive: true });
    toTop.addEventListener('click', () => window.scrollTo(0, 0));
    update();
}
