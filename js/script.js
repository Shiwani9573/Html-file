const STORAGE_KEYS = {
  savedJobs: 'jobNestSavedJobs',
  applications: 'jobNestApplications',
  profile: 'jobNestProfile',
  users: 'jobNestUsers',
  activeUser: 'jobNestActiveUser'
};

const app = {
  init() {
    this.setupMobileMenu();
    this.updateAuthUI();
    this.setupGlobalActions();
    this.setupPageHandlers();
    this.ensureApplicationModal();
  },

  setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    }
  },

  updateAuthUI() {
    const activeUser = this.getActiveUser();
    const authButtons = document.querySelectorAll('[data-auth-button]');
    const navActions = document.querySelector('.nav-actions');

    authButtons.forEach((button) => {
      button.style.display = activeUser ? 'none' : 'inline-flex';
    });

    if (navActions && activeUser) {
      let profileLink = navActions.querySelector('[data-logged-user]');
      if (!profileLink) {
        profileLink = document.createElement('a');
        profileLink.href = 'profile.html';
        profileLink.className = 'nav-link profile-pill';
        profileLink.dataset.loggedUser = 'true';
        profileLink.textContent = `Hi, ${activeUser.name.split(' ')[0]}`;
        const logoutButton = document.createElement('button');
        logoutButton.type = 'button';
        logoutButton.className = 'btn btn-outline';
        logoutButton.dataset.action = 'logout';
        logoutButton.textContent = 'Logout';
        navActions.appendChild(profileLink);
        navActions.appendChild(logoutButton);
      } else {
        profileLink.textContent = `Hi, ${activeUser.name.split(' ')[0]}`;
      }
    }
  },

  setupGlobalActions() {
    document.body.addEventListener('click', (event) => {
      const saveButton = event.target.closest('[data-action="save-job"]');
      const detailButton = event.target.closest('[data-action="view-job"]');
      const applyButton = event.target.closest('[data-action="apply-job"]');
      const logoutButton = event.target.closest('[data-action="logout"]');
      const categoryButton = event.target.closest('[data-category]');

      if (saveButton) {
        const jobId = Number(saveButton.dataset.id);
        this.toggleSavedJob(jobId);
        return;
      }

      if (detailButton) {
        const id = detailButton.dataset.id;
        window.location.href = `job-details.html?id=${id}`;
        return;
      }

      if (applyButton) {
        const id = Number(applyButton.dataset.id);
        const job = this.getJobById(id);
        this.openApplicationModal(job);
        return;
      }

      if (logoutButton) {
        this.logoutUser();
        return;
      }

      if (categoryButton) {
        const category = categoryButton.dataset.category;
        window.location.href = `jobs.html?category=${encodeURIComponent(category)}`;
      }
    });
  },

  setupPageHandlers() {
    const page = document.body.dataset.page;

    if (page === 'home') this.setupHomePage();
    if (page === 'jobs') this.setupJobsPage();
    if (page === 'job-details') this.setupJobDetailsPage();
    if (page === 'saved-jobs') this.setupSavedJobsPage();
    if (page === 'applications') this.setupApplicationsPage();
    if (page === 'profile') this.setupProfilePage();
    if (page === 'categories') this.setupCategoriesPage();
    if (page === 'login') this.setupLoginPage();
    if (page === 'register') this.setupRegisterPage();
    if (page === 'contact') this.setupContactPage();
  },

  setupHomePage() {
    const featuredContainer = document.getElementById('featuredJobs');
    const categoryContainer = document.getElementById('popularCategories');
    const form = document.getElementById('homeSearchForm');

    if (featuredContainer) this.renderFeaturedJobs(featuredContainer, 6);
    if (categoryContainer) this.renderCategoryCards(categoryContainer, 8);

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const keyword = document.getElementById('homeSearch').value.trim();
        const location = document.getElementById('homeLocation').value.trim();
        const category = document.getElementById('homeCategory').value;
        const params = new URLSearchParams();

        if (keyword) params.set('search', keyword);
        if (location) params.set('location', location);
        if (category) params.set('category', category);

        window.location.href = `jobs.html?${params.toString()}`;
      });
    }
  },

  setupJobsPage() {
    const searchInput = document.getElementById('jobsSearch');
    const jobList = document.getElementById('jobsList');
    const countLabel = document.getElementById('jobsCount');
    const filterForm = document.getElementById('jobsFilterForm');
    const sortSelect = document.getElementById('sortJobs');

    const params = new URLSearchParams(window.location.search);
    const prefilledCategory = params.get('category') || '';
    const prefilledSearch = params.get('search') || '';
    const prefilledLocation = params.get('location') || '';

    if (searchInput) searchInput.value = prefilledSearch;
    const categoryField = document.getElementById('filterCategory');
    const locationField = document.getElementById('filterLocation');
    if (categoryField) categoryField.value = prefilledCategory;
    if (locationField) locationField.value = prefilledLocation;

    const render = () => {
      const jobs = this.getFilteredJobs();
      if (jobList) jobList.innerHTML = jobs.length ? jobs.map((job) => this.getJobCardMarkup(job)).join('') : this.noJobsMarkup();
      if (countLabel) countLabel.textContent = `${jobs.length} Job${jobs.length === 1 ? '' : 's'} Found`;
    };

    if (filterForm) {
      filterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        render();
      });

      const clearButton = document.getElementById('clearFilters');
      if (clearButton) {
        clearButton.addEventListener('click', () => {
          filterForm.reset();
          if (searchInput) searchInput.value = '';
          render();
        });
      }
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', render);
    }

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        render();
      });
    }

    render();
  },

  setupJobDetailsPage() {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get('id'));
    const job = this.getJobById(id);
    const container = document.getElementById('jobDetailContent');

    if (!container) return;

    if (!job) {
      container.innerHTML = '<div class="empty-state"><h3>Job not found.</h3><p>The job you requested is no longer available.</p></div>';
      return;
    }

    container.innerHTML = `
      <div class="job-detail-header">
        <div>
          <span class="badge badge-blue">${job.category}</span>
          <h1>${job.title}</h1>
          <div class="job-meta-row">
            <span>${job.company}</span>
            <span>${job.location}</span>
            <span>${job.type}</span>
          </div>
        </div>
        <div class="job-detail-actions">
          <button class="btn btn-outline" data-action="save-job" data-id="${job.id}">${this.isJobSaved(job.id) ? 'Saved' : 'Save Job'}</button>
          <button class="btn btn-primary" data-action="apply-job" data-id="${job.id}">Apply Now</button>
        </div>
      </div>

      <div class="job-detail-grid">
        <div class="detail-card">
          <h3>Job Overview</h3>
          <ul class="detail-list">
            <li><strong>Salary:</strong> ${job.salary}</li>
            <li><strong>Experience:</strong> ${job.experience}</li>
            <li><strong>Work Mode:</strong> ${job.mode}</li>
            <li><strong>Job Type:</strong> ${job.type}</li>
          </ul>
        </div>
        <div class="detail-card">
          <h3>Required Skills</h3>
          <div class="skill-list">
            ${job.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="detail-card">
        <h3>Job Description</h3>
        <p>${job.description}</p>
      </div>

      <div class="detail-card">
        <h3>Responsibilities</h3>
        <ul class="check-list">
          ${job.responsibilities.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>

      <div class="detail-card">
        <h3>Requirements</h3>
        <ul class="check-list">
          ${job.requirements.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;
  },

  setupSavedJobsPage() {
    const container = document.getElementById('savedJobsList');
    if (!container) return;

    const savedJobIds = this.getSavedJobs();
    const savedJobs = savedJobIds
      .map((jobId) => this.getJobById(Number(jobId)))
      .filter(Boolean);

    if (!savedJobs.length) {
      container.innerHTML = '<div class="empty-state"><h3>You haven\'t saved any jobs yet.</h3><p>Browse jobs and save the ones that match your interests.</p></div>';
      return;
    }

    container.innerHTML = savedJobs.map((job) => this.getJobCardMarkup(job)).join('');
  },

  setupApplicationsPage() {
    const container = document.getElementById('applicationsList');
    if (!container) return;

    const applications = this.getApplications();
    if (!applications.length) {
      container.innerHTML = '<div class="empty-state"><h3>No applications yet.</h3><p>Your applied jobs will appear here.</p></div>';
      return;
    }

    container.innerHTML = applications.map((application) => `
      <div class="application-item">
        <div>
          <h3>${application.jobTitle}</h3>
          <p>${application.company}</p>
        </div>
        <div class="application-meta">
          <span>${application.date}</span>
          <span>${application.type}</span>
          <span class="status-pill status-${application.status.toLowerCase().replace(/\s+/g, '-')}">${application.status}</span>
        </div>
      </div>
    `).join('');
  },

  setupProfilePage() {
    const form = document.getElementById('profileForm');
    if (!form) return;

    const profile = this.getProfile();
    Object.entries(profile).forEach(([key, value]) => {
      const field = form.elements.namedItem(key);
      if (field) field.value = value;
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const updatedProfile = Object.fromEntries(formData.entries());
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(updatedProfile));
      const message = document.getElementById('profileMessage');
      if (message) {
        message.textContent = 'Profile updated successfully.';
        message.style.display = 'block';
      }
    });
  },

  setupCategoriesPage() {
    const container = document.getElementById('categoryGrid');
    if (!container) return;

    const categories = [...new Set(window.jobData.map((job) => job.category))];
    const counts = categories.map((category) => ({
      category,
      count: window.jobData.filter((job) => job.category === category).length
    }));

    container.innerHTML = counts.map((item) => `
      <button class="category-card" data-category="${item.category}">
        <div class="category-icon">✦</div>
        <h3>${item.category}</h3>
        <p>${item.count} jobs available</p>
      </button>
    `).join('');
  },

  setupLoginPage() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();
      const users = this.getUsers();
      const user = users.find((entry) => entry.email === email && entry.password === password);
      const message = document.getElementById('loginMessage');

      if (!user) {
        if (message) {
          message.textContent = 'Invalid email or password. Please try again.';
          message.className = 'form-message error';
        }
        return;
      }

      localStorage.setItem(STORAGE_KEYS.activeUser, JSON.stringify({ name: user.name, email: user.email }));
      if (message) {
        message.textContent = 'Login successful. Redirecting...';
        message.className = 'form-message success';
      }
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 700);
    });
  },

  setupRegisterPage() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('registerName').value.trim();
      const email = document.getElementById('registerEmail').value.trim();
      const password = document.getElementById('registerPassword').value.trim();
      const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();
      const message = document.getElementById('registerMessage');

      if (!name || !email || !password || !confirmPassword) {
        if (message) {
          message.textContent = 'Please fill in all fields.';
          message.className = 'form-message error';
        }
        return;
      }

      if (password !== confirmPassword) {
        if (message) {
          message.textContent = 'Passwords do not match.';
          message.className = 'form-message error';
        }
        return;
      }

      const users = this.getUsers();
      if (users.some((user) => user.email === email)) {
        if (message) {
          message.textContent = 'An account with this email already exists.';
          message.className = 'form-message error';
        }
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
      if (message) {
        message.textContent = 'Registration successful. You can now log in.';
        message.className = 'form-message success';
      }
      form.reset();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 800);
    });
  },

  setupContactPage() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = document.getElementById('contactMessage');
      if (message) {
        message.textContent = 'Thank you for contacting JobNest. We will get back to you soon.';
        message.className = 'form-message success';
      }
      form.reset();
    });
  },

  getFilteredJobs() {
    const searchText = (document.getElementById('jobsSearch')?.value || '').trim().toLowerCase();
    const categoryValue = (document.getElementById('filterCategory')?.value || '').trim();
    const locationValue = (document.getElementById('filterLocation')?.value || '').trim();
    const typeValue = (document.getElementById('filterType')?.value || '').trim();
    const experienceValue = (document.getElementById('filterExperience')?.value || '').trim();
    const salaryValue = (document.getElementById('filterSalary')?.value || '').trim();
    const modeValue = (document.getElementById('filterMode')?.value || '').trim();
    const sortValue = document.getElementById('sortJobs')?.value || 'relevance';

    const params = new URLSearchParams(window.location.search);
    const urlCategory = params.get('category') || '';
    const urlSearch = params.get('search') || '';
    const urlLocation = params.get('location') || '';

    const baseSearch = searchText || urlSearch;
    const baseCategory = categoryValue || urlCategory;
    const baseLocation = locationValue || urlLocation;

    let filtered = window.jobData.filter((job) => {
      const matchesSearch =
        !baseSearch ||
        job.title.toLowerCase().includes(baseSearch) ||
        job.company.toLowerCase().includes(baseSearch) ||
        job.location.toLowerCase().includes(baseSearch) ||
        job.skills.some((skill) => skill.toLowerCase().includes(baseSearch));

      const matchesCategory = !baseCategory || job.category === baseCategory;
      const matchesLocation = !baseLocation || job.location.toLowerCase().includes(baseLocation.toLowerCase());
      const matchesType = !typeValue || job.type === typeValue;
      const matchesExperience = !experienceValue || job.experience === experienceValue;
      const matchesMode = !modeValue || job.mode === modeValue;
      const matchesSalary = !salaryValue || this.matchesSalaryRange(job.salary, salaryValue);

      return matchesSearch && matchesCategory && matchesLocation && matchesType && matchesExperience && matchesMode && matchesSalary;
    });

    if (sortValue === 'salary-high') {
      filtered = filtered.sort((a, b) => this.salaryToNumber(b.salary) - this.salaryToNumber(a.salary));
    } else if (sortValue === 'salary-low') {
      filtered = filtered.sort((a, b) => this.salaryToNumber(a.salary) - this.salaryToNumber(b.salary));
    } else if (sortValue === 'newest') {
      filtered = filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  },

  matchesSalaryRange(salaryText, range) {
    const value = this.salaryToNumber(salaryText);
    if (range === '5') return value <= 5;
    if (range === '5-10') return value >= 5 && value <= 10;
    if (range === '10') return value >= 10;
    return true;
  },

  salaryToNumber(salaryText) {
    const match = salaryText.match(/(\d+(?:\.\d+)?)/g);
    if (!match) return 0;
    const numbers = match.map(Number);
    return numbers[numbers.length - 1] || numbers[0] || 0;
  },

  renderFeaturedJobs(container, count = 6) {
    const jobs = window.jobData.slice(0, count);
    container.innerHTML = jobs.map((job) => this.getJobCardMarkup(job)).join('');
  },

  renderCategoryCards(container, limit = 8) {
    const categories = [...new Set(window.jobData.map((job) => job.category))].slice(0, limit);
    container.innerHTML = categories.map((category) => `
      <div class="category-card" data-category="${category}">
        <div class="category-icon">✦</div>
        <h3>${category}</h3>
        <p>${window.jobData.filter((job) => job.category === category).length} jobs available</p>
      </div>
    `).join('');
  },

  getJobCardMarkup(job) {
    const saved = this.isJobSaved(job.id);
    return `
      <article class="job-card">
        <div class="job-top-row">
          <div>
            <span class="company-tag">${job.company}</span>
            <h3>${job.title}</h3>
          </div>
          <button class="save-btn ${saved ? 'saved' : ''}" data-action="save-job" data-id="${job.id}" aria-label="Save job">
            ${saved ? '★ Saved' : '☆ Save'}
          </button>
        </div>
        <div class="job-meta-row">
          <span>${job.location}</span>
          <span>${job.salary}</span>
          <span>${job.type}</span>
        </div>
        <div class="job-details-meta">
          <span>${job.experience}</span>
          <span>${job.mode}</span>
        </div>
        <div class="skill-list">
          ${job.skills.slice(0, 3).map((skill) => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
        <div class="job-card-actions">
          <button class="btn btn-primary" data-action="view-job" data-id="${job.id}">View Details</button>
          <button class="btn btn-outline" data-action="apply-job" data-id="${job.id}">Apply</button>
        </div>
      </article>
    `;
  },

  noJobsMarkup() {
    return `
      <div class="empty-state">
        <h3>No jobs found.</h3>
        <p>Try changing your search or filters.</p>
      </div>
    `;
  },

  ensureApplicationModal() {
    if (document.getElementById('applicationModal')) return;

    const modal = document.createElement('div');
    modal.id = 'applicationModal';
    modal.className = 'modal hidden';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Apply for this job</h3>
          <button type="button" class="modal-close" data-close-modal="true">×</button>
        </div>
        <form id="applicationForm">
          <input type="hidden" name="jobId" id="applicationJobId" />
          <div class="form-grid">
            <div class="form-group">
              <label for="applicantName">Full Name</label>
              <input type="text" id="applicantName" name="fullName" required>
            </div>
            <div class="form-group">
              <label for="applicantEmail">Email</label>
              <input type="email" id="applicantEmail" name="email" required>
            </div>
            <div class="form-group">
              <label for="applicantPhone">Phone Number</label>
              <input type="tel" id="applicantPhone" name="phone" required>
            </div>
            <div class="form-group">
              <label for="applicantEducation">Education</label>
              <input type="text" id="applicantEducation" name="education" required>
            </div>
            <div class="form-group">
              <label for="applicantSkills">Skills</label>
              <input type="text" id="applicantSkills" name="skills" required>
            </div>
            <div class="form-group">
              <label for="applicantExperience">Experience</label>
              <input type="text" id="applicantExperience" name="experience" required>
            </div>
          </div>
          <div class="form-group">
            <label for="applicantResume">Resume Upload</label>
            <input type="file" id="applicantResume" name="resume" accept=".pdf,.doc,.docx" required>
          </div>
          <div class="form-group">
            <label for="applicantCoverLetter">Cover Letter</label>
            <textarea id="applicantCoverLetter" name="coverLetter" rows="5" required></textarea>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-outline" data-close-modal="true">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit Application</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    document.body.addEventListener('click', (event) => {
      if (event.target.closest('[data-close-modal="true"]')) {
        modal.classList.add('hidden');
      }
    });

    const form = document.getElementById('applicationForm');
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const phone = data.get('phone').toString();
        const coverLetter = data.get('coverLetter').toString().trim();
        const resume = data.get('resume');

        if (phone.length < 10) {
          alert('Please enter a valid phone number.');
          return;
        }

        if (coverLetter.length < 20) {
          alert('Please write a cover letter with at least 20 characters.');
          return;
        }

        if (!resume || !resume.name) {
          alert('Please upload your resume.');
          return;
        }

        const jobId = Number(document.getElementById('applicationJobId').value);
        const job = this.getJobById(jobId);
        const applications = this.getApplications();
        const newApplication = {
          id: Date.now(),
          jobId,
          jobTitle: job.title,
          company: job.company,
          type: job.type,
          date: new Date().toLocaleDateString(),
          status: 'Applied'
        };

        applications.unshift(newApplication);
        localStorage.setItem(STORAGE_KEYS.applications, JSON.stringify(applications));
        modal.classList.add('hidden');
        form.reset();
        alert('Application submitted successfully!');
      });
    }
  },

  openApplicationModal(job) {
    const modal = document.getElementById('applicationModal');
    const jobId = document.getElementById('applicationJobId');
    if (modal && jobId) {
      jobId.value = job.id;
      modal.classList.remove('hidden');
    }
  },

  toggleSavedJob(jobId) {
    const savedJobs = this.getSavedJobs();
    const exists = savedJobs.includes(jobId);
    const updated = exists ? savedJobs.filter((id) => id !== jobId) : [...savedJobs, jobId];
    localStorage.setItem(STORAGE_KEYS.savedJobs, JSON.stringify(updated));

    document.querySelectorAll('[data-action="save-job"][data-id="' + jobId + '"]').forEach((button) => {
      const isSaved = updated.includes(jobId);
      button.classList.toggle('saved', isSaved);
      button.textContent = isSaved ? '★ Saved' : '☆ Save';
    });

    if (window.location.pathname.includes('saved-jobs.html')) {
      this.setupSavedJobsPage();
    }
  },

  getSavedJobs() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.savedJobs) || '[]');
    } catch {
      return [];
    }
  },

  isJobSaved(jobId) {
    return this.getSavedJobs().includes(jobId);
  },

  getApplications() {
    const sampleApplications = [
      {
        id: 1,
        jobId: 1,
        jobTitle: 'Frontend Developer',
        company: 'TechNova Solutions',
        type: 'Full Time',
        date: '15 Aug 2026',
        status: 'Under Review'
      },
      {
        id: 2,
        jobId: 6,
        jobTitle: 'Data Analyst',
        company: 'InsightMatrix',
        type: 'Full Time',
        date: '26 Aug 2026',
        status: 'Shortlisted'
      }
    ];

    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.applications) || 'null');
      return stored || sampleApplications;
    } catch {
      return sampleApplications;
    }
  },

  getProfile() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.profile) || '{}');
    } catch {
      return {};
    }
  },

  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
    } catch {
      return [];
    }
  },

  getActiveUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.activeUser) || 'null');
    } catch {
      return null;
    }
  },

  logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.activeUser);
    this.updateAuthUI();
    window.location.href = 'index.html';
  },

  getJobById(jobId) {
    return window.jobData.find((job) => job.id === jobId) || null;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
