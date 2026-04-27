const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

function revealHashTarget() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  const target = document.getElementById(id);
  if (target && target.classList.contains("reveal")) {
    target.classList.add("visible");
  }
}

window.addEventListener("hashchange", revealHashTarget);
window.addEventListener("load", revealHashTarget);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    requestAnimationFrame(() => {
      const target = document.querySelector(href);
      if (target && target.classList.contains("reveal")) {
        target.classList.add("visible");
      }
    });
  });
});

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow = filter === "all" || filter === category;
      card.style.display = shouldShow ? "" : "none";
    });
  });
});

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.querySelector("#name")?.value.trim() || "";
    const email = contactForm.querySelector("#email")?.value.trim() || "";
    const message = contactForm.querySelector("#message")?.value.trim() || "";

    const whatsappText =
      `السلام عليكم، معك ${name || "عميل جديد"}.\n` +
      `${email ? `إيميلي: ${email}\n` : ""}` +
      `تفاصيل الطلب:\n${message || "أرغب في الاستفسار عن الخدمات المتاحة."}`;

    const whatsappUrl = `https://wa.me/966570604402?text=${encodeURIComponent(whatsappText)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    contactForm.reset();
  });
}
