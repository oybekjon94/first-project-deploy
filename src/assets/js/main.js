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
