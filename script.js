(() => {
  "use strict";

  // SUBSTITUA ESTES DADOS ANTES DE PUBLICAR.
  const CONTACT_EMAIL = "antesdoprimeirogole1@gmail.com";
  const WHATSAPP_NUMBER = "5562991021154";
  const PLACEHOLDER_EMAIL = "contato@seudominio.com.br";
  const PLACEHOLDER_WHATSAPP = "5562999999999";

  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const navLinks = [...document.querySelectorAll(".main-nav a")];
  const backToTop = document.querySelector(".back-to-top");
  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");
  const interestSelect = document.querySelector("#interesse");

  const setMenu = (open) => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    const label = menuButton.querySelector(".sr-only");
    if (label) label.textContent = open ? "Fechar menu" : "Abrir menu";
  };

  menuButton?.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenu(false);
      const openDialog = document.querySelector("dialog[open]");
      openDialog?.close();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      menuButton?.getAttribute("aria-expanded") === "true" &&
      !nav?.contains(event.target) &&
      !menuButton?.contains(event.target)
    ) {
      setMenu(false);
    }
  });

  const updateScrollUI = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 12);
    backToTop?.classList.toggle("is-visible", y > 700);
  };

  updateScrollUI();
  window.addEventListener("scroll", updateScrollUI, { passive: true });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Section reveal
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Current section in navigation
  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      navLinks.forEach((link) => {
        const current = link.getAttribute("href") === `#${visible.target.id}`;
        if (current) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-30% 0px -58% 0px", threshold: [0.01, 0.2, 0.5] });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Accessible accordion
  document.querySelectorAll(".accordion-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });

  // Native dialog
  document.querySelectorAll("[data-open-dialog]").forEach((button) => {
    button.addEventListener("click", () => {
      const dialog = document.getElementById(button.dataset.openDialog);
      if (dialog?.showModal) dialog.showModal();
    });
  });

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const outside = (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      );
      if (outside) dialog.close();
    });
  });

  // Buttons can preselect a contact interest.
  document.querySelectorAll("[data-interest]").forEach((link) => {
    link.addEventListener("click", () => {
      const wanted = link.dataset.interest?.trim().toLowerCase();
      if (!wanted || !interestSelect) return;
      const option = [...interestSelect.options].find(
        (item) => item.textContent.trim().toLowerCase() === wanted
      );
      if (option) interestSelect.value = option.value;
    });
  });

  // PDF availability check only on a web server. file:// previews may block fetch.
  document.querySelectorAll("[data-pdf-link]").forEach((link) => {
    link.addEventListener("click", async (event) => {
      if (!/^https?:$/.test(window.location.protocol)) return;
      try {
        const response = await fetch(link.getAttribute("href"), { method: "HEAD" });
        if (!response.ok) {
          event.preventDefault();
          alert("A cartilha ainda não está disponível neste endereço. Verifique se o PDF foi enviado para a pasta documentos.");
        }
      } catch {
        // Network errors should not block the normal browser behavior.
      }
    });
  });

  // Static contact form -> mailto
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "";

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      formStatus.textContent = "Preencha os campos obrigatórios antes de continuar.";
      return;
    }

    const data = new FormData(contactForm);
    const subject = `Antes do Primeiro Gole — ${data.get("interesse")}`;
    const body = [
      `Nome: ${data.get("nome")}`,
      `Instituição: ${data.get("instituicao") || "Não informada"}`,
      `E-mail para retorno: ${data.get("email")}`,
      `Telefone: ${data.get("telefone") || "Não informado"}`,
      `Interesse: ${data.get("interesse")}`,
      "",
      "Mensagem:",
      data.get("mensagem"),
      "",
      "Autorização para contato: Sim"
    ].join("\n");

    if (CONTACT_EMAIL === PLACEHOLDER_EMAIL) {
      formStatus.textContent = "O e-mail profissional ainda precisa ser configurado no arquivo script.js. A mensagem foi preparada, mas o endereço atual é provisório.";
    } else {
      formStatus.textContent = "Abrindo seu aplicativo de e-mail…";
    }

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  // WhatsApp placeholder safety
  const whatsappLink = document.querySelector("[data-whatsapp]");
  if (whatsappLink) {
    whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    whatsappLink.addEventListener("click", (event) => {
      if (WHATSAPP_NUMBER === PLACEHOLDER_WHATSAPP) {
        event.preventDefault();
        formStatus.textContent = "O número de WhatsApp ainda precisa ser configurado no arquivo script.js.";
        formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((item) => {
    item.textContent = String(new Date().getFullYear());
  });
})();
