/* ==========================================
   Cybersecurity Portfolio - Main Script
   ================================---------- */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    // 2. Theme Toggle (Dark / Light Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved user preference
    const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio_theme', newTheme);
        });
    }

    // 3. Active Navigation Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__list a[href*=${sectionId}]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    // 4. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Interactive sample alert triage walkthrough
    const triageButton = document.getElementById('triage-run');
    const triageResult = document.getElementById('triage-result');
    const triageSteps = document.querySelectorAll('#triage-steps li');

    if (triageButton && triageResult && triageSteps.length) {
        const phases = [
            'Step 1 of 3: Confirming the alert and ordering the sample events by time.',
            'Step 2 of 3: Correlating three failed attempts with a subsequent success from the same source.',
            'Step 3 of 3: Recommend verifying the account owner and MFA activity before following incident response policy.'
        ];

        triageButton.addEventListener('click', () => {
            triageButton.disabled = true;
            triageButton.textContent = 'Analyzing…';
            triageResult.classList.remove('is-complete');

            triageSteps.forEach(step => {
                step.classList.remove('is-active', 'is-complete');
                step.removeAttribute('aria-current');
            });

            phases.forEach((phase, index) => {
                window.setTimeout(() => {
                    triageSteps.forEach((step, stepIndex) => {
                        step.classList.toggle('is-complete', stepIndex < index);
                        step.classList.toggle('is-active', stepIndex === index);
                        if (stepIndex === index) {
                            step.setAttribute('aria-current', 'step');
                        } else {
                            step.removeAttribute('aria-current');
                        }
                    });
                    triageResult.textContent = phase;

                    if (index === phases.length - 1) {
                        triageSteps[index].classList.remove('is-active');
                        triageSteps[index].classList.add('is-complete');
                        triageSteps[index].removeAttribute('aria-current');
                        triageResult.textContent = 'Assessment: suspicious sign-in sequence. These sample events alone do not confirm account compromise; verify the user, MFA activity, and sign-in context before following the incident response policy.';
                        triageResult.classList.add('is-complete');
                        triageButton.disabled = false;
                        triageButton.textContent = 'Run again';
                    }
                }, index * 700);
            });
        });
    }
});