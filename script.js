// Mobile menu open/close
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
  });
}

// Automatically show the current year in the footer
document.querySelectorAll(".current-year").forEach((item) => {
  item.textContent = new Date().getFullYear();
});

// Filter project cards by category
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".work-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");

    projectCards.forEach((card) => {
      const shouldShow =
        selectedCategory === "all" ||
        card.dataset.category === selectedCategory;

      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

// Prepare an email from the contact form
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const topic = formData.get("topic");
    const message = formData.get("message");

    const subject = encodeURIComponent(`Website enquiry: ${topic}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nProject details:\n${message}`
    );

    window.location.href =
      `mailto:hello@techpath.example?subject=${subject}&body=${body}`;
  });
}