document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800, // values from 0 to 3000, with step 50ms
    easing: "ease-in-out", // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
  });

  // Initialize tsParticles
  if (document.getElementById("tsparticles")) {
    tsParticles.load("tsparticles", {
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse", // or "grab", "bubble"
          },
          onClick: {
            enable: true,
            mode: "push", // or "remove", "bubble"
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 100, // Reduced distance for less aggressive repulse
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff", // Particle color
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.4, // Lower opacity for subtle links
          width: 1,
        },
        collisions: {
          enable: false, // Disable collisions for smoother flow
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out", // Change to "bounce" if you want them to bounce off edges
          },
          random: false,
          speed: 2, // Slower speed
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800, // Adjust density
          },
          value: 60, // Adjust number of particles
        },
        opacity: {
          value: 0.5, // Particle opacity
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 }, // Smaller particle size
        },
      },
      detectRetina: true,
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  const headerElement = document.querySelector(".site-header"); // Get header element for offset

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor click behavior
      let targetId = this.getAttribute("href");
      let targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Use current header height for offset calculation
        const headerOffset = headerElement ? headerElement.offsetHeight : 0;
        const elementPosition = targetElement.getBoundingClientRect().top;
        // RESTORED Original offset calculation for sticky header
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Optional: Add active class to clicked link (and remove from others)
        navLinks.forEach((nav) => nav.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Add active class to nav link on scroll (Intersection Observer)
  const sections = document.querySelectorAll("main section[id]");
  // Use current header height for rootMargin offset
  const currentHeaderHeight = headerElement ? headerElement.offsetHeight : 0;

  const observerOptions = {
    root: null, // relative to document viewport
    // Adjust rootMargin based on current header height
    rootMargin: `-${currentHeaderHeight}px 0px 0px 0px`,
    threshold: 0.4, // visible amount of item shown in viewport
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        const activeLink = document.querySelector(`.main-nav a[href="#${id}"]`);

        navLinks.forEach((nav) => nav.classList.remove("active"));
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // --- More interactive features can be added below ---
});
