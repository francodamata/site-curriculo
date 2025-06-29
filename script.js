document.addEventListener("DOMContentLoaded", () => {
  const carouselData = [  
    {  
      image: "imgs/sobre1.jpg",  
      text: "Sou Franco da Mata, estudante de Química no IFBA – Salvador. Tenho paixão por ciência, tecnologia e inovação aplicada.",  
      fallbackColor: "#004080"  
    },  
    {  
      image: "imgs/sobre2.jpg",  
      text: "Aos 16 anos, comecei a morar sozinho. Isso me ensinou disciplina, responsabilidade e independência na prática.",  
      fallbackColor: "#004080"  
    },  
    {  
      image: "imgs/sobre3.jpg",  
      text: "Participo da equipe SalvadorVipers e desenvolvo robôs para diversas modalidades, como Resgate e Follow Line.",  
      fallbackColor: "#004080"  
    },  
    {  
      image: "imgs/sobre4.jpg",  
      text: "Domino Arduino, C/C++ e Python. Busco sempre eficiência, inovação e desempenho em projetos físicos e simulados.",  
      fallbackColor: "#004080"  
    },  
    {  
      image: "imgs/sobre5.jpg",  
      text: "Tenho experiência com ferramentas de precisão e lidero montagens e testes. Também atuo como mentor em robótica.",  
      fallbackColor: "#004080"  
    },  
    {  
      image: "imgs/sobre6.jpg",  
      text: "No GPIC, pesquiso reatividade e espectroscopia. Trabalhei com análise de substâncias usando técnicas avançadas.",  
      fallbackColor: "#004080"  
    },  
    {  
      image: "imgs/sobre7.jpg",  
      text: "Uno Química, Eletrônica e Programação. Integrei sensores com Arduino e ESP32 em projetos educacionais e robôs.",  
      fallbackColor: "#004080"  
    },  
    {  
      image: "imgs/sobre8.jpg",  
      text: "Busco soluções que unam ciência e impacto social, usando tecnologia para transformar e inspirar outras pessoas.",  
      fallbackColor: "#004080"  
    }  
  ];  

  const carousel = document.querySelector(".story-carousel");
  const container = carousel.querySelector(".carousel-container");
  const progressBars = carousel.querySelector(".progress-bars");
  const prevBtn = carousel.querySelector(".prev-btn");
  const nextBtn = carousel.querySelector(".next-btn");

  carouselData.forEach((slide, index) => {
    const slideEl = document.createElement("div");
    slideEl.className = "carousel-slide";

    const img = new Image();
    img.src = slide.image;
    img.onload = () => {
      slideEl.style.backgroundImage = `url(${slide.image})`;
    };
    img.onerror = () => {
      slideEl.style.backgroundColor = slide.fallbackColor;
      console.error(`Erro ao carregar: ${slide.image}`);
    };

    const content = document.createElement("div");
    content.className = "slide-content";
    content.innerHTML = `<p>${slide.text}</p>`;
    slideEl.appendChild(content);
    container.appendChild(slideEl);

    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    const progressFill = document.createElement("div");
    progressFill.className = "progress-fill";
    progressBar.appendChild(progressFill);
    progressBars.appendChild(progressBar);
  });

  const slides = container.querySelectorAll(".carousel-slide");
  const bars = progressBars.querySelectorAll(".progress-fill");
  let currentSlide = 0;
  let autoPlayInterval;
  let isPaused = false;

  function updateCarousel() {
    container.style.transform = `translateX(-${currentSlide * 100}%)`;
    bars.forEach((bar, index) => {
      bar.style.width = index === currentSlide ? "100%" : "0%";
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
    resetAutoPlay();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
    resetAutoPlay();
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (!isPaused) nextSlide();
    }, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
  carousel.addEventListener("mouseenter", () => isPaused = true);
  carousel.addEventListener("mouseleave", () => isPaused = false);

  let touchStartX = 0;
  carousel.addEventListener("touchstart", e => touchStartX = e.touches[0].clientX);
  carousel.addEventListener("touchend", e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  });

  updateCarousel();
  startAutoPlay();
});
