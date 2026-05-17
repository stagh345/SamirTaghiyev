const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const certificateUpload = document.getElementById("certificateUpload");
const certificatePreview = document.getElementById("certificatePreview");
const cvUpload = document.getElementById("cvUpload");
const cvDownload = document.getElementById("cvDownload");
const cvStatus = document.getElementById("cvStatus");
const backToTop = document.getElementById("backToTop");
const backToTopLinks = document.querySelectorAll('a[href="#top"], a[href="#pageTop"], .back-to-top-link');

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function scrollToPageTop(event) {
  if (event) event.preventDefault();

  // Works in modern browsers
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  // Fallback for older browsers / local file preview
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

if (backToTop) {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    backToTop.classList.toggle("show", scrolled > 250);
  });

  backToTop.addEventListener("click", scrollToPageTop);
}

backToTopLinks.forEach((link) => {
  link.addEventListener("click", scrollToPageTop);
});

if (certificateUpload && certificatePreview) {
  certificateUpload.addEventListener("change", (event) => {
    const files = Array.from(event.target.files || []);
    certificatePreview.innerHTML = "";

    if (!files.length) return;

    files.forEach((file) => {
      const card = document.createElement("article");
      card.className = "preview-card";

      if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.alt = `${file.name} certificate preview`;
        card.appendChild(img);
      }

      const text = document.createElement("div");
      text.textContent = file.type === "application/pdf" ? `PDF selected: ${file.name}` : file.name;
      card.appendChild(text);
      certificatePreview.appendChild(card);
    });
  });
}

if (cvUpload && cvDownload && cvStatus) {
  cvUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    cvDownload.href = fileUrl;
    cvDownload.download = file.name;
    cvDownload.textContent = "Download Selected CV";
    cvStatus.textContent = `Selected CV: ${file.name}`;
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
