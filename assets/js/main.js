function initParallax() {
  jarallax(document.querySelectorAll('.has-parallax-feed .gh-card'), {
    speed: 0.8,
  })
}

;(function () {
  if (!document.body.classList.contains('has-background-about')) return

  const about = document.querySelector('.gh-about')
  if (!about) return

  const image = about.querySelector('.gh-about-image')

  if (!image.naturalWidth) {
    imagesLoaded(image, function () {
      about.style.setProperty(
        '--about-height',
        (image.clientWidth * image.naturalHeight) / image.naturalWidth + 'px',
      )
    })
  }
})()

;(function () {
  initParallax()
})()

;(function () {
  const toggle = document.querySelector('[data-toggle-comments]')
  if (!toggle) return

  toggle.addEventListener('click', function () {
    document.body.classList.toggle('comments-opened')
  })
})()

;(function () {
  const element = document.querySelector('.gh-article-excerpt')
  if (!element) return

  let text = element.textContent
  const emojiRE = /\p{EPres}|\p{ExtPict}/gu

  const emojis = text.match(emojiRE)
  if (!emojis) return

  emojis.forEach(function (emoji) {
    text = text.replace(emoji, `<span class="emoji">${emoji}</span>`)
  })

  element.innerHTML = text
})()

;(function () {
  pagination(true, initParallax)
})()

document.querySelector('a[href="#consulting"]').addEventListener('click', function (e) {
  e.preventDefault()
  document.querySelector('.gh-consulting').scrollIntoView({
    behavior: 'smooth',
  })
})

// Testimonial Carousel
function initTestimonialCarousel() {
    const slidesContainer = document.querySelector('.gh-testimonial-slides');
    const slides = document.querySelectorAll('.gh-testimonial');
    const dotsContainer = document.querySelector('.gh-testimonial-dots');
    const prevBtn = document.querySelector('.gh-testimonial-btn.prev');
    const nextBtn = document.querySelector('.gh-testimonial-btn.next');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('gh-testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    function updateSlides() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.gh-testimonial-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-advance slides
    setInterval(nextSlide, 5000);
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initTestimonialCarousel);
