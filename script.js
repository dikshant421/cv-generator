// Buttons
const generateBtn = document.getElementById('generateBtn');
const printBtn = document.getElementById('printBtn');
const addEducationBtn = document.getElementById('addEducationBtn');

// Inputs - personal
const fullNameInput = document.getElementById('fullName');
const jobTitleInput = document.getElementById('jobTitle');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');

// Other inputs
const summaryInput = document.getElementById('summary');
const experienceInput = document.getElementById('experience');
const skillsInput = document.getElementById('skills');
const projectsInput = document.getElementById('projects');

// Photo & background inputs
const photoInput = document.getElementById('photoInput');
const bgInput = document.getElementById('bgInput');

// CV elements
const cvName = document.getElementById('cvName');
const cvJobTitle = document.getElementById('cvJobTitle');
const cvEmail = document.getElementById('cvEmail');
const cvPhone = document.getElementById('cvPhone');
const cvAddress = document.getElementById('cvAddress');
const cvSummary = document.getElementById('cvSummary');
const cvExperience = document.getElementById('cvExperience');
const cvSkills = document.getElementById('cvSkills');
const cvProjects = document.getElementById('cvProjects');
const cvPhoto = document.getElementById('cvPhoto');
const cvEducationList = document.getElementById('cvEducationList');
const cvInner = document.getElementById('cvInner');

// Education container (form side)
const educationContainer = document.getElementById('educationContainer');

let educationCount = 0;

// ===== EDUCATION: ADD NEW BLOCK =====
function addEducationBlock() {
  educationCount++;
  const wrapper = document.createElement('div');
  wrapper.className = 'education-item';
  wrapper.dataset.index = educationCount;

  wrapper.innerHTML = `
    <div class="field">
      <label>Degree / Course</label>
      <input type="text" class="edu-degree" placeholder="e.g. B.Tech CSE">
    </div>
    <div class="field">
      <label>Institute / College</label>
      <input type="text" class="edu-institute" placeholder="College / School Name">
    </div>
    <div class="field">
      <label>Year / Duration</label>
      <input type="text" class="edu-year" placeholder="e.g. 2020 - 2024">
    </div>
    <div class="field">
      <label>Description (optional)</label>
      <textarea class="edu-desc" rows="2" placeholder="Extra details if any..."></textarea>
    </div>
  `;

  educationContainer.appendChild(wrapper);
}

// By default ek education block add kar do
addEducationBlock();

addEducationBtn.addEventListener('click', () => {
  addEducationBlock();
});

// ===== GENERATE CV =====
generateBtn.addEventListener('click', () => {
  // Personal info
  cvName.textContent = fullNameInput.value.trim() || 'Your Name';
  cvJobTitle.textContent = jobTitleInput.value.trim() || 'Your Job Title';

  cvEmail.textContent = emailInput.value.trim() || 'email@example.com';
  cvPhone.textContent = phoneInput.value.trim() || '+91-XXXXXXXXXX';
  cvAddress.textContent = addressInput.value.trim() || 'City, Country';

  // Summary
  cvSummary.textContent =
    summaryInput.value.trim() || 'Short summary will appear here...';

  // Experience
  cvExperience.textContent =
    experienceInput.value.trim() || 'Work experience will appear here...';

  // Projects
  cvProjects.textContent =
    projectsInput.value.trim() || 'Projects will appear here...';

  // Skills
  cvSkills.innerHTML = '';
  const skillsText = skillsInput.value.trim();
  if (skillsText) {
    const skillsArray = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (skillsArray.length > 0) {
      skillsArray.forEach((skill) => {
        const li = document.createElement('li');
        li.textContent = skill;
        cvSkills.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = 'Add your skills...';
      cvSkills.appendChild(li);
    }
  } else {
    const li = document.createElement('li');
    li.textContent = 'Add your skills...';
    cvSkills.appendChild(li);
  }

  // Education list
  cvEducationList.innerHTML = '';
  const eduBlocks = document.querySelectorAll('.education-item');
  const eduData = [];

  eduBlocks.forEach((block) => {
    const degree = block.querySelector('.edu-degree').value.trim();
    const institute = block.querySelector('.edu-institute').value.trim();
    const year = block.querySelector('.edu-year').value.trim();
    const desc = block.querySelector('.edu-desc').value.trim();

    if (degree || institute || year || desc) {
      eduData.push({ degree, institute, year, desc });
    }
  });

  if (eduData.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'Education details will appear here...';
    cvEducationList.appendChild(p);
  } else {
    eduData.forEach((ed) => {
      const item = document.createElement('div');
      item.style.marginBottom = '4px';

      const line1 = document.createElement('strong');
      line1.textContent = ed.degree || '(Degree/Course)';
      item.appendChild(line1);

      const line2 = document.createElement('div');
      line2.textContent =
        (ed.institute || 'Institute') + ' | ' + (ed.year || 'Year');
      line2.style.fontSize = '12px';
      item.appendChild(line2);

      if (ed.desc) {
        const line3 = document.createElement('div');
        line3.textContent = ed.desc;
        line3.style.fontSize = '12px';
        item.appendChild(line3);
      }

      cvEducationList.appendChild(item);
    });
  }
});

// ===== PHOTO UPLOAD =====
photoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    cvPhoto.src = event.target.result;
    cvPhoto.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

// ===== BACKGROUND IMAGE UPLOAD =====
bgInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    cvInner.style.backgroundImage = `url('${event.target.result}')`;
  };
  reader.readAsDataURL(file);
});

// ===== PRINT / DOWNLOAD PDF =====
printBtn.addEventListener('click', () => {
  window.print();
});