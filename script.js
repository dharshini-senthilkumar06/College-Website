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

// Save contact form enquiry to Supabase
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  const supabaseClient = window.supabase.createClient(
  "https://takcwipanpoxjfnvwpmr.supabase.co",
  "sb_publishable_Baup-2WFjZ_thOhguTiSKA_gaGrldWJ"
);

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);

    const { error } = await supabaseClient
      .from("enquiries")
      .insert({
        name: formData.get("name"),
        email: formData.get("email"),
        topic: formData.get("topic"),
        message: formData.get("message")
      });

    if (error) {
      alert("not saved: " + error.message);
      return;
    }

    alert("Enquiry saved sucessfully!");
    contactForm.reset();
  });
}
