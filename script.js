/* =====================================================
   ANNISA AZALIA ZAIN
   PERSONAL PORTFOLIO
   JAVASCRIPT
===================================================== */


/* =====================================================
   ELEMENT SELECTOR
===================================================== */

const header = document.getElementById("header");

const menuToggle = document.getElementById("menu-toggle");

const navMenu = document.getElementById("nav-menu");

const navLinks = document.querySelectorAll(".nav-link");

const backToTop = document.getElementById("back-to-top");

const typingText = document.getElementById("typing-text");

const contactForm = document.getElementById("contact-form");

const copyrightYear = document.getElementById("copyright-year");

const revealElements = document.querySelectorAll(".reveal");

const progressBars = document.querySelectorAll(".progress-bar");


/* =====================================================
   MOBILE HAMBURGER MENU
===================================================== */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen.toString()
        );

        const icon = menuToggle.querySelector("i");

        if (icon) {

            if (isOpen) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

}


/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navMenu) {
            navMenu.classList.remove("open");
        }

        document.body.classList.remove("menu-open");

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

});


/* =====================================================
   NAVBAR ON SCROLL
===================================================== */

function handleNavbar() {

    if (!header) {
        return;
    }

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    handleNavbar
);

handleNavbar();


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll(
    "section[id]"
);

function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 180;

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            navLinks.forEach((link) => {

                link.classList.remove("active");

            });

            const activeLink =
                document.querySelector(
                    `.nav-link[href="#${sectionId}"]`
                );

            if (activeLink) {

                activeLink.classList.add("active");

            }

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav
);

updateActiveNav();


/* =====================================================
   TYPING TEXT ANIMATION
===================================================== */

const typingWords = [
    "Creative Student",
    "Web Developer",
    "Future Digital Talent",
    "UI/UX Enthusiast"
];

let wordIndex = 0;

let characterIndex = 0;

let isDeleting = false;


function typeEffect() {

    if (!typingText) {
        return;
    }

    const currentWord =
        typingWords[wordIndex];


    /* Menambah atau menghapus karakter */

    if (isDeleting) {

        characterIndex--;

    } else {

        characterIndex++;

    }


    /* Menampilkan teks */

    typingText.textContent =
        currentWord.substring(
            0,
            characterIndex
        );


    /* Kecepatan mengetik */

    let typingSpeed =
        isDeleting ? 45 : 90;


    /* Ketika kata selesai */

    if (
        !isDeleting &&
        characterIndex === currentWord.length
    ) {

        typingSpeed = 1500;

        isDeleting = true;

    }


    /* Ketika kata sudah terhapus */

    if (
        isDeleting &&
        characterIndex === 0
    ) {

        isDeleting = false;

        wordIndex++;

        if (
            wordIndex >= typingWords.length
        ) {

            wordIndex = 0;

        }

        typingSpeed = 400;

    }


    setTimeout(
        typeEffect,
        typingSpeed
    );

}


/* Jalankan typing effect */

typeEffect();


/* =====================================================
   SCROLL REVEAL
===================================================== */

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    /* Fallback untuk browser lama */

    revealElements.forEach((element) => {

        element.classList.add("active");

    });

}


/* =====================================================
   SKILL PROGRESS BAR
===================================================== */

if ("IntersectionObserver" in window) {

    const skillObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        const progressBar =
                            entry.target;

                        const progress =
                            progressBar.getAttribute(
                                "data-progress"
                            );


                        if (progress) {

                            progressBar.style.width =
                                `${progress}%`;

                        }


                        observer.unobserve(
                            progressBar
                        );

                    }

                });

            },
            {
                threshold: 0.4
            }
        );


    progressBars.forEach((bar) => {

        skillObserver.observe(bar);

    });

} else {

    progressBars.forEach((bar) => {

        const progress =
            bar.getAttribute(
                "data-progress"
            );

        bar.style.width =
            `${progress}%`;

    });

}


/* =====================================================
   BACK TO TOP
===================================================== */

function handleBackToTop() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}

window.addEventListener(
    "scroll",
    handleBackToTop
);

handleBackToTop();


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =====================================================
   CONTACT FORM VALIDATION
===================================================== */

function showError(
    input,
    errorElement,
    message
) {

    if (input) {

        input.parentElement.classList.add(
            "error"
        );

    }

    if (errorElement) {

        errorElement.textContent =
            message;

    }

}


function clearError(
    input,
    errorElement
) {

    if (input) {

        input.parentElement.classList.remove(
            "error"
        );

    }

    if (errorElement) {

        errorElement.textContent = "";

    }

}


/* Email validation */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/* Form */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            /* Input */

            const nameInput =
                document.getElementById(
                    "name"
                );

            const emailInput =
                document.getElementById(
                    "email"
                );

            const messageInput =
                document.getElementById(
                    "message"
                );


            /* Error */

            const nameError =
                document.getElementById(
                    "name-error"
                );

            const emailError =
                document.getElementById(
                    "email-error"
                );

            const messageError =
                document.getElementById(
                    "message-error"
                );


            /* Success */

            const formSuccess =
                document.getElementById(
                    "form-success"
                );


            let isValid = true;


            /* Reset */

            clearError(
                nameInput,
                nameError
            );

            clearError(
                emailInput,
                emailError
            );

            clearError(
                messageInput,
                messageError
            );


            if (formSuccess) {

                formSuccess.classList.remove(
                    "show"
                );

            }


            /* =====================
               VALIDASI NAMA
            ====================== */

            if (
                !nameInput ||
                nameInput.value.trim() === ""
            ) {

                showError(
                    nameInput,
                    nameError,
                    "Nama wajib diisi."
                );

                isValid = false;

            } else if (
                nameInput.value.trim().length < 2
            ) {

                showError(
                    nameInput,
                    nameError,
                    "Nama minimal 2 karakter."
                );

                isValid = false;

            }


            /* =====================
               VALIDASI EMAIL
            ====================== */

            if (
                !emailInput ||
                emailInput.value.trim() === ""
            ) {

                showError(
                    emailInput,
                    emailError,
                    "Email wajib diisi."
                );

                isValid = false;

            } else if (
                !isValidEmail(
                    emailInput.value.trim()
                )
            ) {

                showError(
                    emailInput,
                    emailError,
                    "Format email belum benar."
                );

                isValid = false;

            }


            /* =====================
               VALIDASI PESAN
            ====================== */

            if (
                !messageInput ||
                messageInput.value.trim() === ""
            ) {

                showError(
                    messageInput,
                    messageError,
                    "Pesan wajib diisi."
                );

                isValid = false;

            } else if (
                messageInput.value.trim().length < 10
            ) {

                showError(
                    messageInput,
                    messageError,
                    "Pesan minimal 10 karakter."
                );

                isValid = false;

            }


            /* =====================
               JIKA VALID
            ====================== */

            if (isValid) {

                if (formSuccess) {

                    formSuccess.classList.add(
                        "show"
                    );

                }

                contactForm.reset();


                /* Hilangkan pesan setelah 5 detik */

                setTimeout(() => {

                    if (formSuccess) {

                        formSuccess.classList.remove(
                            "show"
                        );

                    }

                }, 5000);

            }

        }
    );

}


/* =====================================================
   REMOVE FORM ERROR WHILE TYPING
===================================================== */

const formInputs =
    document.querySelectorAll(
        "#contact-form input, #contact-form textarea"
    );


formInputs.forEach((input) => {

    input.addEventListener(
        "input",
        () => {

            input.parentElement.classList.remove(
                "error"
            );

            const errorElement =
                input.parentElement.querySelector(
                    ".error-message"
                );

            if (errorElement) {

                errorElement.textContent = "";

            }

        }
    );

});


/* =====================================================
   COPYRIGHT YEAR
===================================================== */

if (copyrightYear) {

    copyrightYear.textContent =
        new Date().getFullYear();

}


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {

        anchor.addEventListener(
            "click",
            (event) => {

                const targetId =
                    anchor.getAttribute(
                        "href"
                    );


                /* Abaikan href="#" */

                if (
                    targetId === "#" ||
                    !targetId
                ) {

                    event.preventDefault();
                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);