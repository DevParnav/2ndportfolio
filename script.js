const projects = [
  {
    id: "001_AI_RESUME",
    title: "AI Resume Analyzer",
    type: "AI Web Tool",
    status: "Featured",
    cadre: "Featured Project",
    ecoleClient: "Personal / Academic",
    duree: "Ongoing",
    date: "2026",
    stack: ["Python", "Gemini API", "Web Dev", "NLP"],
    shortStack: ["PYTHON", "GEMINI API"],
    summary:
      "An intelligent ATS-friendly tool analyzing resumes via Gemini API, offering detailed skill scoring and formatting intelligence.",
    description:
      "An intelligent ATS-friendly tool that analyzes resumes using AI to provide scores and improvement suggestions.",
    contexte:
      "Built around AI-assisted resume evaluation workflows, the goal is to help users understand strengths, weaknesses, and ATS compatibility through a clearer feedback loop.",
    intervention:
      "Concept, product thinking, interface structure, and implementation around AI scoring and feedback suggestions.",
    link: "https://devparnav.github.io/Portfolio/",
    img: "https://i.postimg.cc/6QPcSxx2/Gemini-Generated-Image-2glviw2glviw2glv.png",
    gallery: [
      "https://i.postimg.cc/6QPcSxx2/Gemini-Generated-Image-2glviw2glviw2glv.png",
      "https://i.postimg.cc/YSWjZ0BV/Chat-GPT-Image-Mar-13-2026-03-25-24-PM.png",
      "https://i.postimg.cc/kGw4hf3P/Screenshot-2026-03-20-160007.png"
    ]
  },
  {
    id: "002_HW_AUTO",
    title: "Autonomous Robotics",
    type: "Robotics Collection",
    status: "Active",
    cadre: "Hands-on Hardware Learning",
    ecoleClient: "Personal / Academic",
    duree: "Project Based",
    date: "2026",
    stack: ["Robotics", "Arduino", "Sensors", "Automation"],
    shortStack: ["ARDUINO"],
    summary:
      "Sensory-driven Arduino systems executing pathing routines and active obstacle avoidance logic.",
    description:
      "A collection of Arduino-based robots including line following, obstacle avoidance, and light-sensitive automation.",
    contexte:
      "These builds focus on practical robotics fundamentals, sensor integration, and automation behavior through small but meaningful real-world experiments.",
    intervention:
      "Hands-on prototyping, wiring, logic setup, testing, and iteration on autonomous robot behavior.",
    link: "https://devparnav.github.io/Portfolio/",
    img: "https://i.postimg.cc/MG8SVVNg/robotik-und-ai-jpg.jpg",
    gallery: [
      "https://i.postimg.cc/MG8SVVNg/robotik-und-ai-jpg.jpg",
      "https://i.postimg.cc/6QPcSxx2/Gemini-Generated-Image-2glviw2glviw2glv.png",
      "https://i.postimg.cc/kGw4hf3P/Screenshot-2026-03-20-160007.png"
    ]
  },
  {
    id: "003_NET_HUB",
    title: "Study Sphere",
    type: "Collaborative Learning Platform",
    status: "Active",
    cadre: "Student-focused Web Project",
    ecoleClient: "Personal / Academic",
    duree: "Ongoing",
    date: "2026",
    stack: ["HTML", "CSS", "JavaScript", "UI Design"],
    shortStack: ["HTML / JS"],
    summary:
      "Collaborative learning platform for resource distribution and study session organization.",
    description:
      "A collaborative learning platform designed to help students share resources and organize study sessions effectively.",
    contexte:
      "The product direction centers on usability, resource sharing, and better organization for students who want a cleaner way to coordinate study materials and sessions.",
    intervention:
      "Concept development, interface design, frontend implementation, and general product structuring around collaboration.",
    link: "https://devparnav.github.io/Portfolio/",
    img: "https://i.postimg.cc/kGw4hf3P/Screenshot-2026-03-20-160007.png",
    gallery: [
      "https://i.postimg.cc/kGw4hf3P/Screenshot-2026-03-20-160007.png",
      "https://i.postimg.cc/6QPcSxx2/Gemini-Generated-Image-2glviw2glviw2glv.png",
      "https://i.postimg.cc/YSWjZ0BV/Chat-GPT-Image-Mar-13-2026-03-25-24-PM.png"
    ]
  }
];

const skillMetrics = {
  hard: [
    { label: "HTML / CSS", value: "90/100", detail: "Strong comfort with structure, layout systems, responsiveness, and component styling." },
    { label: "Python", value: "85/100", detail: "Comfortable with fundamentals, logic building, and AI-oriented experimentation." },
    { label: "C++", value: "80/100", detail: "Solid base in problem solving, programming logic, and academic implementation." },
    { label: "JavaScript", value: "75/100", detail: "Growing frontend implementation confidence with practical UI-focused projects." }
  ],
  soft: [
    { label: "Problem Solving", value: "ACTIVE", detail: "Strong interest in breaking down practical challenges into buildable systems." },
    { label: "Learning Mindset", value: "ACTIVE", detail: "Actively improving across web development, AI, ML, and real-world project work." },
    { label: "Creativity", value: "ACTIVE", detail: "Blends technical work with sketching, visual thinking, and interface experimentation." },
    { label: "Team Collaboration", value: "ACTIVE", detail: "Comfortable collaborating, sharing ideas, and building in student-oriented environments." }
  ]
};

const loader = document.querySelector("#loader");
const loaderCounter = document.querySelector("#loader-counter");
const polygraphFill = document.querySelector("#polygraph-fill");
const loaderFreq = document.querySelector("#loader-freq");
const hudTime = document.querySelector("#hud-time");
const pointerPosition = document.querySelector("#pointer-position");
const cursorMain = document.querySelector(".cursor-main");
const cursorData = document.querySelector(".cursor-data");
const evidenceModal = document.querySelector("#evidence-modal");
const modalContent = document.querySelector("#modal-content");
const modalClose = document.querySelector("#modal-close");
const outputsGrid = document.querySelector("#outputs-grid");
const skillMetricsTrigger = document.querySelector("#skill-metrics-trigger");
let pointerFrame = null;
let latestPointerEvent = null;

function renderOutputs() {
  outputsGrid.innerHTML = projects
    .map((project, index) => {
      const featuredClass = index === 0 ? " output-card--featured" : "";
      return `
        <button class="output-card${featuredClass}" type="button" data-project-id="${project.id}">
          <div class="output-card__inner">
            <div class="output-card__meta mono">
              <span>ID: ${project.id}</span>
              <span>STATUS: ${project.status.toUpperCase()}</span>
            </div>
            <div class="output-card__copy">
              <h3>${project.title}</h3>
              <p>${project.summary}</p>
            </div>
            <div class="output-card__chips mono">
              ${project.shortStack.map((item) => `<span>${item}</span>`).join("")}
            </div>
          </div>
        </button>
      `;
    })
    .join("");
}

function openProject(projectId) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;

  modalContent.innerHTML = `
    <div class="modal-layout">
      <div class="modal-image">
        <img src="${project.img}" alt="${project.title}" />
      </div>
      <div class="modal-copy">
        <div class="modal-eyebrow mono">TOP SECRET // DECRYPTED</div>
        <h2>${project.title}</h2>
        <dl class="meta-grid">
          <dt>TYPE</dt><dd>${project.type}</dd>
          <dt>YEAR</dt><dd>${project.date}</dd>
          <dt>CONTEXT</dt><dd>${project.cadre}</dd>
          <dt>CLIENT</dt><dd>${project.ecoleClient}</dd>
          <dt>DURATION</dt><dd>${project.duree}</dd>
        </dl>
        <div>
          <div class="stack-title mono">STACKS:</div>
          <div class="stack-list">${project.stack.map((item) => `<span>${item}</span>`).join("")}</div>
        </div>
        <p><strong>MISSION_REPORT</strong> ${project.description}</p>
        <p><strong>TECHNICAL_ANALYSIS</strong> ${project.contexte}</p>
        <p><strong>MY_INTERVENTION</strong> ${project.intervention}</p>
        <a class="project-link" href="${project.link}" target="_blank" rel="noopener noreferrer">ACCESS SITE</a>
        <div>
          <div class="gallery-title mono">LOG_PREUVES_ADDITIONNELLES</div>
          <div class="gallery-grid">
            ${project.gallery
              .map(
                (imageUrl, index) => `
                  <a class="gallery-thumb" href="${imageUrl}" target="_blank" rel="noopener noreferrer" aria-label="Evidence ${index + 1}">
                    <img src="${imageUrl}" alt="Evidence ${index + 1}" />
                  </a>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `;

  evidenceModal.showModal();
}

function openSkillsPreview() {
  modalContent.innerHTML = `
    <div class="modal-copy modal-copy--skills">
      <div class="modal-eyebrow mono">PROFILE // DETAILED SKILL PREVIEW</div>
      <h2>SKILL_METRICS</h2>
      <p>A deeper breakdown of current technical confidence, learning momentum, and active strengths.</p>
      <div class="skills-preview-grid">
        <section class="skills-preview-block">
          <div class="stack-title mono">HARD SKILLS</div>
          ${skillMetrics.hard
            .map(
              (item) => `
                <div class="skill-preview-row">
                  <div class="skill-preview-head">
                    <span>${item.label}</span>
                    <strong>${item.value}</strong>
                  </div>
                  <p>${item.detail}</p>
                </div>
              `
            )
            .join("")}
        </section>
        <section class="skills-preview-block">
          <div class="stack-title mono">SOFT SKILLS</div>
          ${skillMetrics.soft
            .map(
              (item) => `
                <div class="skill-preview-row">
                  <div class="skill-preview-head">
                    <span>${item.label}</span>
                    <strong>${item.value}</strong>
                  </div>
                  <p>${item.detail}</p>
                </div>
              `
            )
            .join("")}
        </section>
      </div>
    </div>
  `;

  evidenceModal.showModal();
}

function animateLoader() {
  let progress = 0;
  const timer = window.setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 10;
    if (progress >= 100) {
      progress = 100;
      window.clearInterval(timer);
      window.setTimeout(() => loader.classList.add("is-hidden"), 180);
    }

    loaderCounter.textContent = String(progress).padStart(2, "0");
    polygraphFill.style.width = `${progress}%`;
    loaderFreq.textContent = (12.4 + progress / 100).toFixed(1);
  }, 68);
}

function updateHudTime() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const ff = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, "0");
  hudTime.textContent = `${hh}:${mm}:${ss}:${ff}`;
}

renderOutputs();
animateLoader();
updateHudTime();

window.setInterval(updateHudTime, 500);

outputsGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-project-id]");
  if (!card) return;
  openProject(card.dataset.projectId);
});

skillMetricsTrigger.addEventListener("click", openSkillsPreview);

modalClose.addEventListener("click", () => {
  if (evidenceModal.open) evidenceModal.close();
});

evidenceModal.addEventListener("click", (event) => {
  if (event.target === evidenceModal) evidenceModal.close();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && evidenceModal.open) {
    evidenceModal.close();
  }
});

function flushPointer() {
  pointerFrame = null;
  if (!latestPointerEvent) return;

  const { clientX, clientY } = latestPointerEvent;
  pointerPosition.textContent = `X: ${Math.round(clientX)} Y: ${Math.round(clientY)}`;
  cursorMain.style.transform = `translate(${clientX}px, ${clientY}px)`;
  cursorData.style.transform = `translate(${clientX + 12}px, ${clientY + 12}px)`;
}

window.addEventListener("pointermove", (event) => {
  latestPointerEvent = event;
  if (pointerFrame !== null) return;
  pointerFrame = window.requestAnimationFrame(flushPointer);
});
