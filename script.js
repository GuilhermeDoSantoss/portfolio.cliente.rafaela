// Variáveis globais
let currentTestimonial = 0
const testimonials = [
  {
    name: "Caroline Santos",
    age: "31 anos",
    text: "A Rafaela é incrível! Aos 31 anos, alcancei a melhor versão de mim mesma. Eliminei 10kg, conquistei definição muscular e ganhei mais do que um novo corpo: ganhei autoestima, disposição e bem-estar. Tudo isso com a consultoria online, hoje me sinto mais bonita, mais confiante e com energia para viver plenamente cada dia. Essa transformação foi resultado de um acompanhamento consciente, focado na minha saúde e nos meus objetivos.",
    avatar: "/img/mariaperfil.jpg",
    result: "Emagrecimento",
    beforeImage: "/img/mariaantes1.jpg",
    afterImage: "img/mariadepois1.jpg",
  },
  {
    name: "Liza Mendes",
    age: "27 anos",
    text: "Aos 27 anos, conquistei o equilíbrio entre saúde, estética e autoestima. Eliminei 8kg com um processo consciente e focado, e ainda ganhei massa muscular de forma saudável. Hoje me sinto mais forte, mais bonita e, acima de tudo, mais confiante com meu corpo e minhas escolhas.",
    avatar: "/img/carlaperfil.jpg",
    result: "Redução de Gordura e Hipertrofia",
    beforeImage: "/img/carlaantes1.jpg",
    afterImage: "/img/carladepois1.jpg",
  },
  {
    name: "Gabriel Gomes",
    age: "31 anos",
    text: "Eliminei 13kg de gordura e conquistei mais massa muscular e definição com um plano focado em resultado, disciplina e acompanhamento profissional. Hoje me sinto mais forte, mais confiante e com energia de sobra para viver o melhor da vida. Essa mudança vai muito além da estética é sobre bem-estar, autoestima e superação!",
    avatar: "/img/fernandoperfil.jpg",
    result: "Hipertrofia e Ganho de Massa Magra",
    beforeImage: "/img/fernandoantes1.jpg",
    afterImage: "/img/fernandodepois2.jpg",
  },
]

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  initializeAnimations()
  initializeMobileMenu()
  initializeScrollEffects()
  initializeCounters()
  initializeTestimonials()
  initializeSmoothScroll()
  createFloatingParticles()
})

// Inicializar animações de entrada
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observar elementos com animações
  const animatedElements = document.querySelectorAll('[class*="animate-"]')
  animatedElements.forEach((el) => {
    if (
      !el.classList.contains("animate-bounce-gentle") &&
      !el.classList.contains("animate-float") &&
      !el.classList.contains("pulse")
    ) {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      observer.observe(el)
    }
  })
}

// Menu mobile
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")
  const menuIcon = document.getElementById("menuIcon")

  if (!mobileMenuBtn || !mobileMenu || !menuIcon) return

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")

    if (mobileMenu.classList.contains("active")) {
      menuIcon.className = "fas fa-times"
    } else {
      menuIcon.className = "fas fa-bars"
    }
  })

  // Fechar menu ao clicar em link
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      menuIcon.className = "fas fa-bars"
    })
  })
}

// Efeitos de scroll
function initializeScrollEffects() {
  const header = document.getElementById("header")

  window.addEventListener(
    "scroll",
    debounce(() => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    }, 10),
  )
}

// Contador animado
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number")

  const observerOptions = {
    threshold: 0.5,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = Number.parseInt(counter.getAttribute("data-target"))
        const increment = target / 100
        let current = 0

        const updateCounter = () => {
          if (current < target) {
            current += increment
            counter.textContent = Math.ceil(current) + (target === 96 ? "%" : "+")
            setTimeout(updateCounter, 20)
          } else {
            counter.textContent = target + (target === 96 ? "%" : "+")
          }
        }

        updateCounter()
        observer.unobserve(counter)
      }
    })
  }, observerOptions)

  counters.forEach((counter) => observer.observe(counter))
}

// Carrossel de depoimentos
function initializeTestimonials() {
  updateTestimonial(0)

  // Auto-rotate testimonials
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length
    updateTestimonial(currentTestimonial)
  }, 8000)
}

function updateTestimonial(index) {
  const testimonial = testimonials[index]
  const testimonialCard = document.querySelector(".testimonial-card")

  if (!testimonialCard) return

  // Fade out
  testimonialCard.style.opacity = "0"
  testimonialCard.style.transform = "translateY(20px)"

  setTimeout(() => {
    // Atualizar conteúdo
    const avatar = testimonialCard.querySelector(".testimonial-avatar")
    const name = testimonialCard.querySelector(".testimonial-name")
    const age = testimonialCard.querySelector(".testimonial-age")
    const result = testimonialCard.querySelector(".testimonial-result")
    const text = testimonialCard.querySelector(".testimonial-text")
    const beforeImage = testimonialCard.querySelector(".before-image img")
    const afterImage = testimonialCard.querySelector(".after-image img")

    if (avatar) avatar.src = testimonial.avatar
    if (name) name.textContent = testimonial.name
    if (age) age.textContent = testimonial.age
    if (result) result.textContent = testimonial.result
    if (text) text.textContent = `"${testimonial.text}"`
    if (beforeImage) beforeImage.src = testimonial.beforeImage
    if (afterImage) afterImage.src = testimonial.afterImage

    // Atualizar dots
    const dots = document.querySelectorAll(".dot")
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index)
    })

    // Fade in
    testimonialCard.style.opacity = "1"
    testimonialCard.style.transform = "translateY(0)"
  }, 300)
}

function changeTestimonial(direction) {
  currentTestimonial += direction
  if (currentTestimonial >= testimonials.length) {
    currentTestimonial = 0
  } else if (currentTestimonial < 0) {
    currentTestimonial = testimonials.length - 1
  }
  updateTestimonial(currentTestimonial)
}

function goToTestimonial(index) {
  currentTestimonial = index
  updateTestimonial(currentTestimonial)
}

// WhatsApp functions
function openWhatsApp() {
  const phoneNumber = "5521980582820"
  const message = "Olá Prof. Rafaela! Tudo bem!? Gostaria de saber mais sobre os seus serviços de Personal Trainer."
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank")
}

// Newsletter form
function handleNewsletterSubmit(e) {
  e.preventDefault()

  const input = e.target.querySelector(".newsletter-input")
  const button = e.target.querySelector(".btn")

  if (!input.value.trim()) {
    alert("Por favor, insira um e-mail válido.")
    return
  }

  const originalText = button.textContent
  button.textContent = "Enviando..."
  button.disabled = true

  setTimeout(() => {
    alert("E-mail cadastrado com sucesso! Obrigada pelo interesse.")
    input.value = ""
    button.textContent = originalText
    button.disabled = false
  }, 2000)
}

// Smooth scroll para links internos
function initializeSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      const targetId = link.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        scrollToSection(targetId.substring(1))
      }
    })
  })
}

function scrollToSection(sectionId) {
  const targetElement = document.getElementById(sectionId)
  if (targetElement) {
    const headerHeight = document.getElementById("header").offsetHeight
    const targetPosition = targetElement.offsetTop - headerHeight

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })
  }
}

// Adicionar partículas flutuantes no background
function createFloatingParticles() {
  const hero = document.querySelector(".hero")

  if (!hero) return

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div")
    particle.style.position = "absolute"
    particle.style.width = Math.random() * 8 + 4 + "px"
    particle.style.height = particle.style.width
    particle.style.background = "rgba(236, 72, 153, 0.1)"
    particle.style.borderRadius = "50%"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`
    particle.style.animationDelay = Math.random() * 2 + "s"
    particle.style.pointerEvents = "none"
    particle.style.zIndex = "1"

    hero.appendChild(particle)
  }
}

// Performance optimization
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Adicionar efeitos hover dinâmicos
document.addEventListener("DOMContentLoaded", () => {
  // Efeito parallax suave no hero
  window.addEventListener(
    "scroll",
    debounce(() => {
      const scrolled = window.pageYOffset
      const heroImage = document.querySelector(".hero-image")
      const heroText = document.querySelector(".hero-text")

      if (heroImage && heroText && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`
        heroText.style.transform = `translateY(${scrolled * 0.05}px)`
      }
    }, 10),
  )

  // Efeito de mouse nos cards de serviço
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "scale(1.05) translateY(-10px)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1) translateY(0)"
    })
  })
})
