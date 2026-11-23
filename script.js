
// =====================================
// LUA - MANUAL DE PROGRAMAÇÃO
// INTERAÇÕES E FUNCIONALIDADES
// =====================================

// MENU MOBILE

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");

    menuToggle.textContent =
        sidebar.classList.contains("open") ? "✕" : "☰";
});

// FECHAR MENU AO CLICAR EM UM CAPÍTULO

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        sidebar.classList.remove("open");
        menuToggle.textContent = "☰";
    });
});

// IDENTIFICAR A SEÇÃO ATUAL

const sections = document.querySelectorAll(
    "main section[id]"
);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    "#" + entry.target.id
                ) {
                    link.classList.add("active");
                }
            });
        }
    });
}, {
    rootMargin: "-25% 0px -60% 0px"
});

sections.forEach(section => {
    observer.observe(section);
});

// BARRA DE PROGRESSO DE LEITURA

const progressBar = document.getElementById(
    "readingProgress"
);

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    progressBar.style.width = progress + "%";
});

// BOTÕES PARA COPIAR CÓDIGOS

document.querySelectorAll("pre").forEach(block => {
    const button = document.createElement("button");

    button.textContent = "Copiar código";

    button.className = "copy-button";

    button.addEventListener("click", async () => {
        const code = block.querySelector("code");

        if (!code) return;

        try {
            await navigator.clipboard.writeText(
                code.innerText
            );

            button.textContent = "Copiado! ✓";

            setTimeout(() => {
                button.textContent = "Copiar código";
            }, 1800);

        } catch (error) {
            button.textContent = "Não foi possível copiar";
        }
    });

    block.style.position = "relative";
    block.appendChild(button);
});
