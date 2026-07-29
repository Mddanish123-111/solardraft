// Lightbox Gallery Modal Fix
function openLightbox(imgUrl) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImg');
    if (modal && img) {
        img.src = imgUrl;
        modal.style.display = 'flex';
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Gallery Filtering Logic
function filterGallery(category) {
    const cards = document.querySelectorAll('.gallery-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }

    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Dynamic Project Submission API Call
const projectForm = document.getElementById('solarProjectForm');
if (projectForm) {
    projectForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const projectData = {
            clientName: document.getElementById('clientName').value,
            siteAddress: document.getElementById('siteAddress').value,
            preferredSoftware: document.getElementById('preferredSoftware').value,
            projectNotes: document.getElementById('projectNotes').value
        };

        const responseMsg = document.getElementById('responseMessage');
        responseMsg.innerText = "Submitting project details to SolarDraft Database...";
        responseMsg.style.color = "#2874f0";

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
            });

            const result = await response.json();

            if (response.ok) {
                responseMsg.style.color = "#388e3c";
                responseMsg.innerText = "✅ Success! Project queued in SolarDraft Database. ID: " + result.projectId;
                projectForm.reset();
            } else {
                responseMsg.style.color = "#d32f2f";
                responseMsg.innerText = "❌ Error submitting request: " + result.message;
            }
        } catch (err) {
            responseMsg.style.color = "#d32f2f";
            responseMsg.innerText = "❌ Backend Server Connection Error.";
        }
    });
}

// Subscription Modal Handler
function selectPlan(planName) {
    const modal = document.getElementById('subModal');
    const planTitle = document.getElementById('selectedPlanTitle');
    const planInput = document.getElementById('planInput');

    if (modal && planTitle && planInput) {
        planTitle.innerText = planName;
        planInput.value = planName;
        modal.style.display = 'flex';
    }
}

function closeSubModal() {
    const modal = document.getElementById('subModal');
    if (modal) modal.style.display = 'none';
}

function handleSubSubmit(e) {
    e.preventDefault();
    const plan = document.getElementById('planInput').value;
    const company = document.getElementById('companyName').value;
    const email = document.getElementById('workEmail').value;

    alert(`Thank you! Subscription request for ${plan} submitted for ${company} (${email}). Our onboarding specialist will contact you shortly.`);
    closeSubModal();
}
EOF
