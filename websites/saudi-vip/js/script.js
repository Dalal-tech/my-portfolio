// تأثيرات الظهور عند التمرير (خفيفة وسريعة)
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
  {
    threshold: 0.16
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("شكرًا لك. تم استلام طلبك، وسيتم التواصل معك قريبًا.");
    contactForm.reset();
  });
}
