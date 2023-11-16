'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// page navigation
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('LInk');
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button> ';

header.append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

const btnscrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnscrollTo.addEventListener('click', function () {
  const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left:s1coords.left+window.pageXOffset,
  //   top:s1coords.top+window.pageYOffset,
  //   behavior:"smooth"
  // })

  section1.scrollIntoView({ behavior: 'smooth' });
});

//tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabscontent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const newcl = e.target;
  const clicked = e.target.closest('.operations__tab');
  console.log(newcl);
  console.log(clicked);

  if (!clicked) return;

  tabs.forEach(function (t) {
    t.classList.remove('operations__tab--active');
  });
  clicked.classList.add('operations__tab--active');

  console.log(clicked.getAttribute('data-tab'));

  //  activate the content area
  console.log(tabscontent);
  tabscontent.forEach(function (cont) {
    cont.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`)
    .classList.add('operations__content--active');
});

// fade in fade out

const nav = document.querySelector('.nav');
const handlehover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handlehover.bind(0.5));
nav.addEventListener('mouseout', handlehover.bind(1));

// sticky navigation

// this is one way of doing it the sticky
// const initcords=section1.getBoundingClientRect();
// window.addEventListener('scroll',function(){
//   if(window.scrollY>initcords.top){
//     nav.classList.add('sticky')

//   }
//   else{
//     nav.classList.remove('sticky')
//   }
// })

// we can also do it using the intersection observer api...

const heaader = document.querySelector('.header');
const navheight = nav.getBoundingClientRect().height;

const stickynav = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const observeheader = new IntersectionObserver(stickynav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navheight}px`,
});
observeheader.observe(heaader);

const allsection = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allsection.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden')
});

// lazy loading images

const loadimg = function (entries, observer) {
  const entry = entries[0];
  console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgTargets = document.querySelectorAll('img[data-src]');
const imageobserver = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imageobserver.observe(img));

const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const maxSlide = slides.length;

const slider = document.querySelector('.slider');
// slider.style.transform='scale(0.4) translateX(-800px)'
slider.style.overflow = 'hidden';

const btnleft = document.querySelector('.slider__btn--left');
const btnright = document.querySelector('.slider__btn--right');

const gotoSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
const nextslide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  gotoSlide(currentSlide);
  activateDot(currentSlide);
};

const prevslide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  gotoSlide(currentSlide);
  activateDot(currentSlide);
};

gotoSlide(0);

btnright.addEventListener('click', nextslide);
btnleft.addEventListener('click', prevslide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    prevslide();
  }
  if (e.key === 'ArrowRight') {
    nextslide();
  }
});

const dotContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach(function (s, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
console.log(createDots);

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    console.log(slide);
    gotoSlide(slide);
    activateDot(slide);
  }
});
console.log(document.querySelectorAll('.dots__dot'));

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add('dots__dot--active');
};
