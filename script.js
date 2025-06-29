document.addEventListener("DOMContentLoaded", () => {
const carouselData = [  
{  
image: "imgs/sobre1.jpg",  
text: "Meu nome é Franco da Mata Perri Guimarães Cathalá, e minha jornada profissional é marcada por curiosidade, esforço incansável e paixão pela criação. Atualmente, sou estudante do curso técnico integrado em Química no IFBA – Campus Salvador, onde mergulho não só na ciência dos materiais e reações, mas também no mundo da tecnologia, engenharia e inovação aplicada.",  
fallbackColor: "#004080"  
},  
{  
image: "imgs/sobre2.jpg",  
text: "Desde muito cedo, trilhei um caminho movido pela busca por conhecimento prático e impacto real. Aos 16 anos, assumi a independência e comecei a morar sozinho, o que me ensinou mais do que qualquer sala de aula: disciplina, responsabilidade e maturidade.",  
fallbackColor: "#004080"  
},  
{  
image: "imgs/sobre3.jpg",  
text: "Ao mesmo tempo, me envolvi profundamente com a robótica educacional, sendo competidor e desenvolvedor. Faço parte da equipe SalvadorVipers, reconhecida nacionalmente, além de colaborar com outros grupos no desenvolvimento de robôs para diferentes modalidades, como Follow Line, Resgate, Sumô e Arduino Interativo.",  
fallbackColor: "#004080"  
},  
{  
image: "imgs/sobre4.jpg",  
text: "Sou especialista em Arduino, com domínio em C/C++ e Python, e sempre busco eficiência e inovação — seja otimizando tempos de execução, seja projetando layouts físicos de robôs no SolidWorks ou sBotics. Tenho um histórico de adaptações criativas para ambientes simulados e reais, sempre priorizando o desempenho e a inteligência das máquinas.",  
fallbackColor: "#004080"  
},  
{  
image: "imgs/sobre5.jpg",  
text: "Minha atuação não se limita ao laboratório ou à bancada. Tenho habilidades manuais sólidas, experiência com ferramentas elétricas e de precisão (microretífica, furadeira, cortadora), e assumo com frequência a liderança em montagem, teste e aprimoramento de sistemas físicos. Também me destaco pela capacidade de comunicar ideias com clareza, seja em apresentações técnicas, seja como mentor e orientador de novas gerações na robótica.",  
fallbackColor: "#004080"  
},  
{  
image: "imgs/sobre6.jpg",  
text: "Além disso, faço parte do grupo de pesquisa GPIC – Pesquisa em Química Inorgânica, onde desenvolvemos investigações laboratoriais voltadas para análise de substâncias, reatividade química e caracterização de materiais sólidos e líquidos. Em uma das práticas mais marcantes, trabalhei com espectroscopia de absorção na região infravermelha e ultravioleta, utilizando brometo de potássio e substâncias sólidas desconhecidas comprimidas em pastilhas. Essa experiência me aproximou de técnicas analíticas de ponta, envolvendo instrumentação, física quântica e química estrutural.",  
fallbackColor: "#004080"  
},  
{  
image: "imgs/sobre7.jpg",  
text: "Minha formação me dá base para lidar com equipamentos laboratoriais de alta precisão, análises químicas e físico-químicas, mas meu diferencial está na capacidade de unir a Química à Eletrônica e à Programação. Em meus projetos, já integrei sensores químicos e ópticos com microcontroladores como Arduino e ESP32, criando soluções interativas para experimentos, protótipos educacionais e robôs autônomos.",  
fallbackColor: "#004080"  
},  
{  
image: "imgs/sobre8.jpg",  
text: "E, acima de tudo, sou movido por um objetivo claro: criar soluções que unam ciência, tecnologia e propósito social. Acredito que a formação técnica e científica só faz sentido quando ela é colocada a serviço do mundo, seja desenvolvendo novos materiais, melhorando a eficiência de sistemas energéticos ou inspirando outros jovens a enxergarem na ciência um caminho de transformação.",  
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
