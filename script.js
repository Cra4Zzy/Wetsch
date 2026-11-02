(() => {
  'use strict';
  const navToggle = document.querySelector('#nav-toggle');
  const nav = document.querySelector('#navigation');
  const closeMenu = () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menü öffnen');
  };
  navToggle?.addEventListener('click', () => {
    const next = navToggle.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', next);
    navToggle.setAttribute('aria-expanded', String(next));
    navToggle.setAttribute('aria-label', next ? 'Menü schließen' : 'Menü öffnen');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 740) closeMenu(); }, {passive:true});

  const services = {
    earth: {
      number:'01', title:'Der erste Schritt für jedes Vorhaben.',
      description:'Erdarbeiten und Aushub schaffen die Grundlage für das, was anschließend gebaut wird. Wetsch ist im Bereich Erdbau und Baggerarbeiten tätig.',
      label:'Erdbau anfragen', subject:'Anfrage Erdbau und Baggerarbeiten'
    },
    truck: {
      number:'02', title:'Wenn Material in Bewegung kommt.',
      description:'Kipperfahrzeuge und regionale Schüttguttransporte gehören laut veröffentlichten Stellenanzeigen zum Arbeitsalltag des Unternehmens.',
      label:'Transport anfragen', subject:'Anfrage Schüttguttransport'
    },
    material: {
      number:'03', title:'Aus Material wird wieder Material.',
      description:'Die Aufbereitung von Bauschutt und Straßenaufbruch in Sittlingen ist amtlich dokumentiert. Angaben zu konkreten Lieferkörnungen und Verfügbarkeit sollten direkt abgestimmt werden.',
      label:'Material anfragen', subject:'Anfrage Baustoffrecycling'
    }
  };
  const buttons = [...document.querySelectorAll('[data-service]')];
  const detail = document.getElementById('service-detail');
  const detailTitle = document.getElementById('detail-title');
  const detailDescription = document.getElementById('detail-description');
  const detailNumber = document.getElementById('detail-num');
  const detailLink = document.getElementById('detail-link');
  const setService = key => {
    if (!services[key]) return;
    const service = services[key];
    buttons.forEach(b => {const isCurrent = b.dataset.service === key;b.classList.toggle('is-selected',isCurrent);b.setAttribute('aria-pressed',String(isCurrent));});
    detailTitle.textContent = service.title;
    detailDescription.textContent = service.description;
    detailNumber.textContent = service.number;
    detailLink.firstChild.textContent = service.label + ' ';
    detailLink.href = 'mailto:wetsch@sittlingen.de?subject=' + encodeURIComponent(service.subject);
  };
  buttons.forEach(button => button.addEventListener('click',()=>{
    setService(button.dataset.service);
    if (window.matchMedia('(max-width:740px)').matches) detail.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});
  }));

  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const topic = String(data.get('topic') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = `Website-Anfrage: ${topic}`;
    const body = `Guten Tag,\n\n${message}\n\nMit freundlichen Grüßen\n${name}\nE-Mail: ${email}`;
    window.location.href = `mailto:wetsch@sittlingen.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
