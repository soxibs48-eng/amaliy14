/**
 * REMMY - Continuous Care for Healthy Skin
 * Core Interactive Scripts & Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroAudioPlayer();
  initRoutineChecklist();
  initInteractiveChart();
  initCircularGauges();
  initChatMockup();
  initConditionsModal();
  initAssessmentQuiz();
  initHeroForms();
});

// ==========================================
// 1. Mobile Navbar Toggle
// ==========================================
function initNavbar() {
  const menuToggle = document.getElementById('menuToggle');
  const navbar = document.querySelector('.navbar');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('nav-mobile-open');
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('nav-mobile-open');
      });
    });
  }
}

// ==========================================
// 2. Hero Glassmorphism Audio/Pill Player
// ==========================================
function initHeroAudioPlayer() {
  const playBtn = document.getElementById('heroPlayBtn');
  const waveSpans = document.querySelectorAll('.pill-waveform span');
  const pillText = document.getElementById('heroPillText');
  let isPlaying = true;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      
      waveSpans.forEach(span => {
        span.style.animationPlayState = isPlaying ? 'running' : 'paused';
      });

      if (playBtn.querySelector('svg')) {
        playBtn.innerHTML = isPlaying 
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      }

      if (pillText) {
        pillText.textContent = isPlaying 
          ? "Skin Analysis: Day 21 Review" 
          : "Audio Paused • Click to Listen";
      }
    });
  }
}

// ==========================================
// 3. Interactive Routine Checklist
// ==========================================
function initRoutineChecklist() {
  const checkBoxes = document.querySelectorAll('.routine-checkbox');
  const progressBadge = document.getElementById('routineProgressBadge');

  function updateProgress() {
    const total = checkBoxes.length;
    let completed = 0;

    checkBoxes.forEach(cb => {
      const item = cb.closest('.routine-item');
      if (cb.checked) {
        completed++;
        item.classList.add('completed');
      } else {
        item.classList.remove('completed');
      }
    });

    if (progressBadge) {
      progressBadge.textContent = `${completed}/${total} Done`;
    }

    if (completed === total && total > 0) {
      showToast('🎉 All skincare steps completed for today! Streak +1 day.');
    }
  }

  checkBoxes.forEach(cb => {
    cb.addEventListener('change', updateProgress);
  });
}

// ==========================================
// 4. Interactive Progress Chart (7D, 30D, 90D)
// ==========================================
function initInteractiveChart() {
  const chartButtons = document.querySelectorAll('.chart-toggle-btn');
  const chartPolyline = document.getElementById('chartPolyline');
  const chartFill = document.getElementById('chartFill');
  const chartScore = document.getElementById('chartScoreVal');

  const chartData = {
    '7D': {
      points: '10,90 60,82 110,65 160,55 210,40 260,25 280,18',
      fill: '10,90 60,82 110,65 160,55 210,40 260,25 280,18 280,120 10,120',
      score: '94/100',
      change: '+14% this week'
    },
    '30D': {
      points: '10,105 50,95 100,85 150,60 200,42 250,22 280,12',
      fill: '10,105 50,95 100,85 150,60 200,42 250,22 280,12 280,120 10,120',
      score: '88/100',
      change: '+42% this month'
    },
    '90D': {
      points: '10,115 50,110 100,98 150,75 200,50 250,30 280,10',
      fill: '10,115 50,110 100,98 150,75 200,50 250,30 280,10 280,120 10,120',
      score: '96/100',
      change: '+78% overall'
    }
  };

  chartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      chartButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const range = btn.getAttribute('data-range') || '7D';
      const data = chartData[range];

      if (data && chartPolyline && chartFill) {
        chartPolyline.setAttribute('points', data.points);
        chartFill.setAttribute('points', data.fill);
        if (chartScore) chartScore.textContent = data.score;
      }
    });
  });
}

// ==========================================
// 5. Circular Gauges Animation
// ==========================================
function initCircularGauges() {
  const circleHydration = document.getElementById('circleHydration');
  const circleBarrier = document.getElementById('circleBarrier');

  // Trigger stroke-dashoffset animation smoothly
  if (circleHydration) {
    // 92% of 220 circumference ≈ 220 * (1 - 0.92) = 17.6
    setTimeout(() => {
      circleHydration.style.strokeDashoffset = '17.6';
    }, 400);
  }

  if (circleBarrier) {
    // 88% of 220 circumference ≈ 220 * (1 - 0.88) = 26.4
    setTimeout(() => {
      circleBarrier.style.strokeDashoffset = '26.4';
    }, 600);
  }
}

// ==========================================
// 6. Interactive Dermatologist Chat Mockup
// ==========================================
function initChatMockup() {
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');

  const doctorReplies = [
    "Great question! I recommend applying your niacinamide serum right after cleansing while skin is slightly damp.",
    "Your barrier is recovering nicely! Keep using SPF 50 daily to protect newly formed skin cells.",
    "If you feel slight tingling, ease into the retinol every second night. Hydration first!",
    "Your routine is well balanced. I've updated your evening checklist in the app."
  ];

  if (chatForm && chatInput && chatMessages) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userText = chatInput.value.trim();
      if (!userText) return;

      // Add user message
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.textContent = userText;
      chatMessages.appendChild(userBubble);
      chatInput.value = '';

      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Doctor reply delay
      setTimeout(() => {
        const docBubble = document.createElement('div');
        docBubble.className = 'chat-bubble doctor';
        const randomReply = doctorReplies[Math.floor(Math.random() * doctorReplies.length)];
        
        docBubble.innerHTML = `
          <div class="chat-doctor-header">
            <span>Dr. Emily Vance</span>
            <span class="chat-doctor-badge">Derm</span>
          </div>
          <div>${randomReply}</div>
        `;
        chatMessages.appendChild(docBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 900);
    });
  }
}

// ==========================================
// 7. Conditions Detail Modal
// ==========================================
const conditionDetails = {
  acne: {
    title: "Acne & Blemish Regimen",
    icon: "🌱",
    desc: "Targeted regulation of excess sebum, gentle exfoliation with 2% Salicylic Acid, and soothing Niacinamide without stripping the moisture barrier.",
    actives: ["Salicylic Acid (BHA)", "Niacinamide 4%", "Zinc PCA", "Centella Asiatica"]
  },
  rosacea: {
    title: "Rosacea & Redness Relief",
    icon: "💧",
    desc: "Clinically formulated anti-inflammatory protocol with Azelaic acid to diminish erythema and strengthen fragile capillary vessels.",
    actives: ["Azelaic Acid 10%", "Green Tea Extract", "Colloidal Oatmeal", "Ceramides"]
  },
  eczema: {
    title: "Eczema & Atopic Care",
    icon: "✨",
    desc: "Intensive physiological lipid repair combining 3 essential ceramides, fatty acids, and cholesterol in an optimal 3:1:1 ratio.",
    actives: ["Ceramide NP/AP/EOP", "Squalane", "Beta-Glucan", "Glycerin"]
  },
  psoriasis: {
    title: "Psoriasis & Plaque Calming",
    icon: "🌿",
    desc: "Keratolytic normalization to soothe accelerated cell turnover, reduce scales, and calm irritation with gentle emollients.",
    actives: ["Urea 10%", "Salicylic Acid", "Shea Butter", "Aloe Barbadensis"]
  },
  melasma: {
    title: "Melasma & Dark Spot Correction",
    icon: "☀️",
    desc: "Multi-pathway tyrosinase inhibition pairing Tranexamic Acid and Alpha Arbutin with broad-spectrum zinc oxide UV defense.",
    actives: ["Tranexamic Acid 3%", "Alpha Arbutin 2%", "Vitamin C (EAC)", "Zinc Oxide"]
  },
  dryness: {
    title: "Chronic Dryness & Dehydration",
    icon: "🌊",
    desc: "Multi-molecular weight hyaluronic acid infused with natural moisturizing factors (NMF) for 72-hour moisture lock.",
    actives: ["Hyaluronic Acid Complex", "Polyglutamic Acid", "Panthenol (B5)", "Jojoba Esters"]
  },
  aging: {
    title: "Fine Lines & Firming Protocol",
    icon: "⏳",
    desc: "Micro-encapsulated retinaldehyde and copper tripeptides stimulate natural pro-collagen synthesis with zero redness or peeling.",
    actives: ["Encapsulated Retinal", "Copper Tripeptide-1", "Bakuchiol", "Adenosine"]
  },
  pores: {
    title: "Pore Refining & Blackhead Protocol",
    icon: "🎯",
    desc: "Sebum liquefaction and pore-wall conditioning with gentle polyhydroxy acids (PHA) and purifying kaolin clay extracts.",
    actives: ["Gluconolactone (PHA)", "Witch Hazel (alcohol-free)", "Bentonite", "Salicin"]
  },
  redness: {
    title: "Barrier Repair & Sensitivity",
    icon: "🛡️",
    desc: "SOS soothing barrier shield that neutralizes stinging, burning, and micro-cracks from aggressive previous treatments.",
    actives: ["Madecassoside", "Ectoin", "Allantoin", "Bifida Ferment Lysate"]
  },
  other: {
    title: "Custom Dermatologist Formulation",
    icon: "🔬",
    desc: "Have a combination of concerns? Our licensed dermatology specialists create bespoke protocols tailored to your unique profile.",
    actives: ["Bespoke Compound Matching", "Dermatologist Tele-Review", "Formulation Tweaks"]
  }
};

function initConditionsModal() {
  const cards = document.querySelectorAll('.condition-card');
  const modalBackdrop = document.getElementById('conditionModalBackdrop');
  const modalTitle = document.getElementById('condModalTitle');
  const modalDesc = document.getElementById('condModalDesc');
  const modalActives = document.getElementById('condModalActives');
  const modalIcon = document.getElementById('condModalIcon');
  const closeBtn = document.getElementById('condModalClose');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-condition');
      const data = conditionDetails[type] || conditionDetails.acne;

      if (modalTitle) modalTitle.textContent = data.title;
      if (modalDesc) modalDesc.textContent = data.desc;
      if (modalIcon) modalIcon.textContent = data.icon;

      if (modalActives) {
        modalActives.innerHTML = data.actives
          .map(item => `<li style="display:flex;align-items:center;gap:8px;margin-bottom:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${item}</li>`)
          .join('');
      }

      if (modalBackdrop) modalBackdrop.classList.add('active');
    });
  });

  if (closeBtn && modalBackdrop) {
    closeBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
  }
}

// ==========================================
// 8. Assessment Quiz Modal Flow
// ==========================================
function initAssessmentQuiz() {
  const openButtons = document.querySelectorAll('.trigger-quiz-btn');
  const quizModal = document.getElementById('quizModalBackdrop');
  const quizClose = document.getElementById('quizCloseBtn');
  const options = document.querySelectorAll('.quiz-option');
  const quizSubmit = document.getElementById('quizSubmitBtn');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (quizModal) quizModal.classList.add('active');
    });
  });

  if (quizClose && quizModal) {
    quizClose.addEventListener('click', () => quizModal.classList.remove('active'));
    quizModal.addEventListener('click', (e) => {
      if (e.target === quizModal) quizModal.classList.remove('active');
    });
  }

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  if (quizSubmit && quizModal) {
    quizSubmit.addEventListener('click', () => {
      quizModal.classList.remove('active');
      showToast('✨ Assessment submitted! Your personalized routine has been calculated.');
    });
  }
}

// ==========================================
// 9. Hero Form & Lead Capture
// ==========================================
function initHeroForms() {
  const forms = document.querySelectorAll('.lead-capture-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const val = input ? input.value.trim() : '';
      
      if (val) {
        showToast(`📲 App invite link sent to ${val}! Check your messages.`);
        form.reset();
      }
    });
  });
}

// ==========================================
// Toast Helper
// ==========================================
function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
