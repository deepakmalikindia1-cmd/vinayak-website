// Mobile navigation
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Header shadow on scroll
const header = document.querySelector('.header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal on scroll
const revealEls = document.querySelectorAll('.section__head, .service, .why__item, .steps li, .highlight, .about__copy, .faq__list details, .contact__info, .form');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => { el.classList.add('reveal'); io.observe(el); });
}

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Quote form: validates, then opens the visitor's email app with the details filled in.
const form = document.getElementById('quote-form');
const note = document.getElementById('form-note');
form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll('[required]').forEach(f => {
    const ok = f.value.trim() !== '' && f.checkValidity();
    f.classList.toggle('is-invalid', !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    note.textContent = 'Please fill in the required fields marked *.';
    note.className = 'form__note is-error';
    return;
  }
  const d = Object.fromEntries(new FormData(form));
  const subject = `Quote request: ${d.service} (${d.type}) from ${d.name}`;
  const body = [
    `Name: ${d.name}`,
    `Company: ${d.company || '-'}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
    `Service: ${d.service}`,
    `Shipment type: ${d.type}`,
    `Origin: ${d.origin || '-'}`,
    `Destination: ${d.destination || '-'}`,
    '',
    'Cargo details:',
    d.message
  ].join('\n');
  window.location.href = `mailto:vinayakinternationalfs@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  note.textContent = 'Thank you! Your email app should open with your enquiry ready to send.';
  note.className = 'form__note is-ok';
});
