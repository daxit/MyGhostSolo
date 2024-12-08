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

// Testimonial Carousel
function initTestimonialCarousel() {
    const slidesContainer = document.querySelector('.gh-testimonial-slides');
    const slides = document.querySelectorAll('.gh-testimonial');
    const dotsContainer = document.querySelector('.gh-testimonial-dots');
    const prevBtn = document.querySelector('.gh-testimonial-btn.prev');
    const nextBtn = document.querySelector('.gh-testimonial-btn.next');
    
    // If any required element is missing, exit early
    if (!slidesContainer || !slides.length || !dotsContainer || !prevBtn || !nextBtn) {
        console.warn('Testimonial carousel elements not found');
        return;
    }

    let currentSlide = 0;
    let isAnimating = false;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('gh-testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    function updateSlides() {
        if (isAnimating) return;
        isAnimating = true;
        
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        document.querySelectorAll('.gh-testimonial-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // Reset animation lock after transition
        setTimeout(() => {
            isAnimating = false;
        }, 500); // Match this with your CSS transition duration
    }

    function goToSlide(index) {
        if (isAnimating) return;
        currentSlide = index;
        updateSlides();
    }

    function nextSlide() {
        if (isAnimating) return;
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        if (isAnimating) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    // Add event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Add touch support
    let touchStartX = 0;
    let touchEndX = 0;

    slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slidesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) nextSlide();
        if (touchStartX - touchEndX < -50) prevSlide();
    });

    // Auto-advance slides
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Pause autoplay on hover
    slidesContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    slidesContainer.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    });

    // Initial setup
    updateSlides();
}

// Initialize carousel when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonialCarousel);
} else {
    initTestimonialCarousel();
}
