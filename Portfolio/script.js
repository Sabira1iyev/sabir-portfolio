const projectsData = {
    "Shopping": [
        {
            name: "Chips Website",
            tech: ["HTML", "CSS", "JS"],
            link: "https://adorable-biscuit-2015fe.netlify.app/#products",
            img: "images/chips.jpg"
        }
    ],
    "Personal Portfolio": [
        {
            name: "Mini Portfolio",
            tech: ["HTML", "CSS"],
            link: "https://jocular-speculoos-b411dd.netlify.app/#",
            img: "images/portfolyo1.png"
        }
    ],
    "Film / Video Gallery": [
        {
            name: "Video Sharing",
            tech: ["HTML", " CSS"],
            link: "https://filmvideo.netlify.app/",
            img: "images/filmVideo.png"
        }
    ]
};

function updateProjectCounts() {
    document.querySelectorAll('.category-card').forEach(card => {
        const title = card.querySelector('h2').textContent.trim();
        const count = projectsData[title]?.length || 0;
        card.querySelector('.project-count').textContent = `${count} Project${count !== 1 ? 's' : ''}`;
    });
}

updateProjectCounts();

document.querySelectorAll('.category-card .button-proje button').forEach((btn) => {
    btn.addEventListener('click', function () {
        const card = btn.closest('.category-card');
        const title = card.querySelector('h2').textContent.trim();
        showProjectsModal(title);
    });
});

function showProjectsModal(category) {
    document.getElementById('modal-title').textContent = category + " Projes";
    const list = projectsData[category] || [];
    let html = "";
    if (list.length === 0) {
        html = "<p>No projects have been added yet.</p>";
    }
    else {
        html = `<div class = "project-grid">` +
            list.map(p => `
                <div class = "project-card">
                <img src = "${p.img}" alt="${p.name}" class = "project-img"/>
                <h3>${p.name}</h3>
                <div class = "tech-list">${p.tech.map(t => `<span>${t}</span>`).join(' ')}</div>
                <a href = "${p.link}" target = "_blank" class="go-btn">Go To Page</a>
                </div> 
                `).join('') +
            `</div>`;
    }
    document.getElementById('modal-project-list').innerHTML = html;
    document.getElementById('project-modal').style.display = "flex";
}

document.querySelector('.modal .close').onclick = function () {
    document.getElementById('project-modal').style.display = "none";
};

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        document.getElementById('project-modal').style.display = "none";
    }
};

/*skills-section*/

let isPasswordVerified = false;
let passwordCallback = null;
let skillsData = {};

const showPasswordModal = () => {
    return new Promise((resolve) => {
        passwordCallback = resolve;
        document.getElementById('password-modal').style.display = 'flex';
        document.getElementById('password-input').focus();
    });
};

const checkPassword = async () => {
    if(isPasswordVerified){
        return true;
    }
    
    const result = await showPasswordModal();
    return result;
};

const loadSkillsData = async () => {
    try {
         const savedData = localStorage.getItem('skillsData');
        if (savedData) {
            skillsData = JSON.parse(savedData);
        } else {
             const response = await fetch('skills-data.json');
            skillsData = await response.json();
        }
    } catch (error) {
        console.log('Skills data yüklenemedi, varsayılan değerler kullanılıyor');
        skillsData = {
            "HTML": 10, "CSS": 10, "JavaScript": 10, "Bootstrap": 10, "Tailwind": 10,
            "C++": 10, "Python": 10, "NodeJs": 10, "JAVA": 3, "SQL": 10,
            "CAPCUT": 10, "Aligt Motion": 10, "Piscart": 10, "Davinci Resolve": 10, "Filming": 10
        };
    }
};

const saveSkillsData = async () => {
    try {
        localStorage.setItem('skillsData', JSON.stringify(skillsData));
    } catch (error) {
        console.log('Skills data kaydedilemedi');
    }
};

 document.getElementById('password-submit').addEventListener('click', () => {
    const password = document.getElementById('password-input').value;
    if(password === "sa2aliyev_2005"){
        isPasswordVerified = true;
        document.getElementById('password-modal').style.display = 'none';
        document.getElementById('password-input').value = '';
        if(passwordCallback) passwordCallback(true);
    } else {
        alert("Wrong password! You can't make changes");
        document.getElementById('password-input').value = '';
        if(passwordCallback) passwordCallback(false);
    }
});

document.getElementById('password-cancel').addEventListener('click', () => {
    document.getElementById('password-modal').style.display = 'none';
    document.getElementById('password-input').value = '';
    if(passwordCallback) passwordCallback(false);
});

document.getElementById('password-input').addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        document.getElementById('password-submit').click();
    }
});

// Skills kartlarını oluştur
const createSkillCards = () => {
    document.querySelectorAll('.skill-card').forEach(card => {
        const plusBtn = card.querySelector('.plus-btn');
        const minusBtn = card.querySelector('.minus-btn');
        const persentSpan = card.querySelector('.progress-percent');
        const fillBar = card.querySelector('.progress-fill');
        const skillName = card.querySelector('.skill-name').textContent.trim();

        const updateProgress = (save = true) => {
            fillBar.style.width = `${skillsData[skillName] || 0}%`;
            persentSpan.textContent = `${skillsData[skillName] || 0}%`;
            if (save) {
                saveSkillsData();
            }
        };
 
        plusBtn.addEventListener('click', async () => {
            if(await checkPassword()){
                if((skillsData[skillName] || 0) < 100){
                    skillsData[skillName] = (skillsData[skillName] || 0) + 1;
                    updateProgress();
                }
            }
        });

        minusBtn.addEventListener('click', async () => {
            if(await checkPassword()){
                if((skillsData[skillName] || 0) > 0){
                    skillsData[skillName] = (skillsData[skillName] || 0) - 1;
                    updateProgress();
                }
            }
        });

        // İlk yükleme
        updateProgress(false);
    });
};

// Menu Functions
document.addEventListener('DOMContentLoaded', async () => {
    await loadSkillsData();
    
    // Skills kartlarını oluştur
    createSkillCards();
    
    const menuBtn = document.querySelector('.menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const navMenu = document.querySelector('.sections ul');

    let initialDistance = 0;
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            initialDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        }
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
        }
    }, { passive: false });

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.add('active');
        menuBtn.classList.add('hidden');
        closeMenuBtn.classList.add('active');
    });

    closeMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.remove('active');
        menuBtn.classList.remove('hidden');
        closeMenuBtn.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuBtn.contains(e.target) && !closeMenuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('hidden');
            closeMenuBtn.classList.remove('active');
        }
    });

    const menuLinks = document.querySelectorAll('.sections ul li a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('hidden');
            closeMenuBtn.classList.remove('active');
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                surname: formData.get('surname'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            try {
                const response = await fetch('https://kind-imagination-production.up.railway.app/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    alert('Mesajınız başarıyla gönderildi!');
                    contactForm.reset();
                } else {
                    alert('Mesaj gönderilirken bir hata oluştu: ' + result.message);
                }
            } catch (error) {
                console.error('Form gönderme hatası:', error);
                alert('Mesaj gönderilirken bir hata oluştu.');
            }
        });
    }
});
