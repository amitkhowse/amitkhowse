document.addEventListener("DOMContentLoaded", () => {
    // 1. GSAP Reveal Animations
    gsap.from(".neumorph", {
        opacity: 1,
        y: 30,
        duration: 0.8,
        // stagger: 0.2,
        ease: "power2.out"
    });

    gsap.registerPlugin(ScrollTrigger);
        
        // Reveal animation on scroll
        gsap.utils.toArray(".reveal").forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                },
                opacity: 1,
                y: 50,
                duration: 1,
                ease: "power3.out"
            });
        });

    // 2. Hire Me Modal Logic
    const hireBtn = document.getElementById("hireBtn");
    
    // Create Modal Element Dynamically if it doesn't exist
    const createModal = () => {
        const modalHtml = `
            <div id="hireModal" class="fixed inset-0 z-[100] hidden items-center justify-center bg-surface/90 backdrop-blur-md p-6">
                <div class="bg-surface neumorph max-w-2xl w-full p-10 rounded-3xl relative text-center">
                    <button id="closeModal" class="absolute top-5 right-5 w-10 h-10 neumorph rounded-full text-brand text-xl">&times;</button>
                    <h2 class="text-3xl font-bold mb-2">Hire Me</h2>
                    <p class="text-slate-500 mb-8">Choose a service that fits your needs</p>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="neumorph-inset p-6 rounded-3xl">
                            <span class="text-xs font-bold text-brand tracking-tighter uppercase">Hourly</span>
                            <h3 class="text-xl font-bold mt-2">$40/hr</h3>
                            <button class="mt-4 bg-brand text-white w-full py-2 rounded-2xl">Select</button>
                        </div>
                        <div class="neumorph p-6 rounded-3xl border-2 border-brand">
                            <span class="text-xs font-bold text-brand tracking-tighter uppercase">Fixed</span>
                            <h3 class="text-xl font-bold mt-2">$500/project</h3>
                            <button class="mt-4 bg-brand text-white w-full py-2 rounded-2xl">Select</button>
                        </div>
                    </div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    };

    createModal();

    const modal = document.getElementById("hireModal");
    const closeModal = document.getElementById("closeModal");

    hireBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    });

    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    let isMenuOpen = false;

    // Toggle Mobile Menu with GSAP
    menuToggle.addEventListener("click", () => {
        if (!isMenuOpen) {
            mobileMenu.classList.remove("hidden");
            mobileMenu.classList.add("flex");
            gsap.fromTo(mobileMenu, 
                { opacity: 0, y: -20, scale: 0.95 }, 
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
            );
            menuToggle.innerHTML = "✕"; // Change icon to close
        } else {
            gsap.to(mobileMenu, { 
                opacity: 0, y: -20, scale: 0.95, duration: 0.3, 
                onComplete: () => {
                    mobileMenu.classList.add("hidden");
                    mobileMenu.classList.remove("flex");
                } 
            });
            menuToggle.innerHTML = "☰";
        }
        isMenuOpen = !isMenuOpen;
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add("hidden");
            menuToggle.innerHTML = "☰";
            isMenuOpen = false;
        });
    });
});

// 1. Enhanced Project Array (Ensure "cat" matches your data-category)
const projects = [
    { id: 1, title: "Purcrave E-Commerce", cat: "E-Commerce", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400" },
    { id: 2, title: "Tathastu Clinic", cat: "Web App", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400" },
    { id: 3, title: "Solar Solutions Bhopal", cat: "Web App", img: "https://images.unsplash.com/photo-1509391366360-fe5bb6521e2c?w=400" },
    // ... rest of your 25 projects
];

const grid = document.getElementById('projectGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

// 2. Function to Render Projects
function renderProjects(filter = 'all') {
    // Filter the array
    const filteredData = filter === 'all' 
        ? projects 
        : projects.filter(p => p.cat === filter);

    // Clear and Fill Grid
    grid.innerHTML = filteredData.map(p => `
        <div class="project-item reveal group">
            <div class="neumorph p-4 rounded-[2.5rem] overflow-hidden transition-transform duration-500 hover:-translate-y-3">
                <div class="relative overflow-hidden rounded-[2rem] aspect-video mb-6">
                    <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700">
                </div>
                <div class="px-4 pb-4">
                    <span class="text-brand text-[10px] font-bold uppercase tracking-widest mb-2 block">${p.cat}</span>
                    <h3 class="text-xl font-bold mb-4">${p.title}</h3>
                    <a href="project-details.html?id=${p.id}" class="inline-block w-full py-3 text-center neumorph-inset rounded-2xl text-sm font-bold text-brand hover:text-white hover:bg-brand transition-all">
                        View Case Study
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    // 3. GSAP Animation for smooth entrance
    gsap.from(".project-item", {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    });
}

// 4. Filter Button Click Event
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Reset styles for all buttons
        filterBtns.forEach(b => {
            b.classList.remove('bg-brand', 'text-white');
            b.classList.add('text-slate-600');
        });

        // Highlight active button
        btn.classList.add('bg-brand', 'text-white');
        btn.classList.remove('text-slate-600');

        // Render filtered projects
        const category = btn.getAttribute('data-category');
        renderProjects(category);
    });
});

// Initial Render
window.onload = () => renderProjects('all');