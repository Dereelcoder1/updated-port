


document.addEventListener('DOMContentLoaded', function() {


    console.log("🚀 script.js is running!");


    const supabase = window.supabase;


    // Sample projects data
    const projectsData = [
        {
            id: 1,
            title: 'E-commerce Dashboard',
            description: 'A responsive dashboard for e-commerce websites',
            image: '/placeholder.svg?height=50&width=50',
            category: 'Web Development',
            date: '2023-05-15',
            status: 'Published',
            views: 1245
        },
        {
            id: 2,
            title: 'Mobile App UI',
            description: 'UI design for a fitness tracking mobile app',
            image: '/placeholder.svg?height=50&width=50',
            category: 'UI/UX Design',
            date: '2023-04-22',
            status: 'Published',
            views: 876
        },
        {
            id: 3,
            title: 'Portfolio Website',
            description: 'Personal portfolio website with dark theme',
            image: '/placeholder.svg?height=50&width=50',
            category: 'Web Development',
            date: '2023-03-10',
            status: 'Published',
            views: 2134
        },
        {
            id: 4,
            title: 'Task Management App',
            description: 'A web application for task management',
            image: '/placeholder.svg?height=50&width=50',
            category: 'Web Development',
            date: '2023-02-28',
            status: 'Draft',
            views: 543
        },
        {
            id: 5,
            title: 'Restaurant Booking System',
            description: 'Online booking system for restaurants',
            image: '/placeholder.svg?height=50&width=50',
            category: 'Mobile App',
            date: '2023-01-15',
            status: 'Archived',
            views: 321
        }
    ];

    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mainContent = document.querySelector('.main-content');
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const contentSections = document.querySelectorAll('.content-section');
    const projectsTableBody = document.getElementById('projects-table-body');
    const addProjectBtn = document.getElementById('add-project-btn');
    const addProjectForm = document.getElementById('add-project-form');
    const projectImageInput = document.getElementById('project-image');
    const fileNameDisplay = document.getElementById('file-name');
    const tagInput = document.getElementById('tag-input');
    const tagsContainer = document.getElementById('tags-container');
    const projectTagsInput = document.getElementById('project-tags');
    const userDropdownBtn = document.querySelector('.user-dropdown-btn');
    const userDropdown = document.querySelector('.user-dropdown');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastClose = document.getElementById('toast-close');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const modalCancel = document.getElementById('modal-cancel');
    const modalConfirm = document.getElementById('modal-confirm');
    
    // Create mobile overlay for sidebar
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);

    // Initialize the projects table
    function initProjectsTable() {
        projectsTableBody.innerHTML = '';
        
        projectsData.forEach(project => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="project-title">
                        <div class="project-image">
                            <img src="${project.image}" alt="${project.title}">
                        </div>
                        <div class="project-info">
                            <h4>${project.title}</h4>
                            <p>${project.description}</p>
                        </div>
                    </div>
                </td>
                <td>${project.category}</td>
                <td>${formatDate(project.date)}</td>
                <td><span class="status-badge status-${project.status.toLowerCase()}">${project.status}</span></td>
                <td>${project.views}</td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn view" data-id="${project.id}" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit" data-id="${project.id}" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" data-id="${project.id}" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            projectsTableBody.appendChild(row);
        });

        // Add event listeners to action buttons
        document.querySelectorAll('.action-btn.view').forEach(btn => {
            btn.addEventListener('click', function() {
                const projectId = this.getAttribute('data-id');
                viewProject(projectId);
            });
        });

        document.querySelectorAll('.action-btn.edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const projectId = this.getAttribute('data-id');
                editProject(projectId);
            });
        });

        document.querySelectorAll('.action-btn.delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const projectId = this.getAttribute('data-id');
                deleteProject(projectId);
            });
        });
    }

    // Format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // View project
    function viewProject(projectId) {
        const project = projectsData.find(p => p.id == projectId);
        
        if (project) {
            modalTitle.textContent = 'Project Details';
            modalBody.innerHTML = `
                <div class="project-details">
                    <div class="project-image" style="width: 100%; height: 200px; margin-bottom: 1.5rem;">
                        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--border-radius);">
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-meta" style="margin-top: 1.5rem;">
                            <p><strong>Category:</strong> ${project.category}</p>
                            <p><strong>Date:</strong> ${formatDate(project.date)}</p>
                            <p><strong>Status:</strong> <span class="status-badge status-${project.status.toLowerCase()}">${project.status}</span></p>
                            <p><strong>Views:</strong> ${project.views}</p>
                        </div>
                    </div>
                </div>
            `;
            
            modalConfirm.style.display = 'none';
            modalCancel.textContent = 'Close';
            
            showModal();
        }
    }

    // Edit project
    function editProject(projectId) {
        const project = projectsData.find(p => p.id == projectId);
        
        if (project) {
            showToast('Edit functionality would be implemented here');
            // In a real application, you would populate a form with the project data
        }
    }

    // Delete project
    function deleteProject(projectId) {
        const project = projectsData.find(p => p.id == projectId);
        
        if (project) {
            modalTitle.textContent = 'Confirm Delete';
            modalBody.innerHTML = `
                <p>Are you sure you want to delete the project "${project.title}"?</p>
                <p>This action cannot be undone.</p>
            `;
            
            modalConfirm.style.display = 'block';
            modalConfirm.textContent = 'Delete';
            modalCancel.textContent = 'Cancel';
            
            // Set up the confirm button to actually delete
            modalConfirm.onclick = function() {
                // In a real app, you would send a request to delete from the database
                const index = projectsData.findIndex(p => p.id == projectId);
                if (index !== -1) {
                    projectsData.splice(index, 1);
                    initProjectsTable();
                    hideModal();
                    showToast('Project deleted successfully');
                }
            };
            
            showModal();
        }
    }

    // Show modal
    function showModal() {
        modal.classList.add('show');
    }

    // Hide modal
    function hideModal() {
        modal.classList.remove('show');
    }

    // Show toast notification
    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            hideToast();
        }, 3000);
    }

    // Hide toast notification
    function hideToast() {
        toast.classList.remove('show');
    }

    // Initialize charts
    function initCharts() {
        // Views Chart
        const viewsCtx = document.getElementById('viewsChart').getContext('2d');
        const viewsChart = new Chart(viewsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Project Views',
                    data: [1200, 1900, 3000, 2500, 2800, 3500],
                    backgroundColor: 'rgba(218, 165, 32, 0.2)',
                    borderColor: 'rgba(218, 165, 32, 1)',
                    borderWidth: 2,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0a0'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0a0'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });

        // Category Chart
        const categoryCtx = document.getElementById('categoryChart').getContext('2d');
        const categoryChart = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Web Development', 'Mobile App', 'UI/UX Design', 'Other'],
                datasets: [{
                    data: [12, 5, 8, 3],
                    backgroundColor: [
                        'rgba(218, 165, 32, 0.8)',
                        'rgba(184, 134, 11, 0.8)',
                        'rgba(255, 215, 0, 0.8)',
                        'rgba(240, 230, 140, 0.8)'
                    ],
                    borderColor: '#1e1e1e',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#ffffff',
                            padding: 20
                        }
                    }
                }
            }
        });

        // Performance Chart
        const performanceCtx = document.getElementById('performanceChart').getContext('2d');
        const performanceChart = new Chart(performanceCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Views',
                        data: [1200, 1900, 3000, 2500, 2800, 3500],
                        backgroundColor: 'rgba(218, 165, 32, 0.8)',
                        borderColor: 'rgba(218, 165, 32, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Likes',
                        data: [600, 800, 1500, 1200, 1400, 1800],
                        backgroundColor: 'rgba(184, 134, 11, 0.8)',
                        borderColor: 'rgba(184, 134, 11, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Comments',
                        data: [300, 400, 700, 600, 500, 900],
                        backgroundColor: 'rgba(255, 215, 0, 0.8)',
                        borderColor: 'rgba(255, 215, 0, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0a0'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0a0'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });
    }

    // Toggle sidebar
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show');
        mobileOverlay.classList.toggle('show');
    });

    // Close sidebar when clicking on overlay
    mobileOverlay.addEventListener('click', function() {
        sidebar.classList.remove('show');
        mobileOverlay.classList.remove('show');
    });

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(link => link.parentElement.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('show');
                mobileOverlay.classList.remove('show');
            }
        });
    });

    // Add Project button
    addProjectBtn.addEventListener('click', function() {
        // Switch to add project section
        navLinks.forEach(link => link.parentElement.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        
        document.querySelector('[data-section="add-project-section"]').parentElement.classList.add('active');
        document.getElementById('add-project-section').classList.add('active');
    });

    // File upload
    projectImageInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileNameDisplay.textContent = this.files[0].name;
        } else {
            fileNameDisplay.textContent = 'No file chosen';
        }
    });

    // Tags input
    tagInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            e.preventDefault();
            
            const tag = this.value.trim();
            addTag(tag);
            
            this.value = '';
        }
    });

    // Add tag
    function addTag(tagText) {
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `
            ${tagText}
            <span class="tag-remove">×</span>
        `;
        
        tag.querySelector('.tag-remove').addEventListener('click', function() {
            tag.remove();
            updateTagsInput();
        });
        
        tagsContainer.appendChild(tag);
        updateTagsInput();
    }

    // Update hidden tags input
    function updateTagsInput() {
        const tags = Array.from(tagsContainer.querySelectorAll('.tag')).map(tag => {
            return tag.textContent.trim().slice(0, -1); // Remove the × character
        });
        
        projectTagsInput.value = JSON.stringify(tags);
    }

    // Add project form submission
    addProjectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        addProjectForm.addEventListener('submit', async function (e) {
            e.preventDefault();
          
            const formData = new FormData(this);
            const title = formData.get('title');
            const category = formData.get('category');
            const description = formData.get('description');
            const status = formData.get('status');
            const tags = JSON.parse(document.getElementById('project-tags').value || '[]');
            const imageFile = document.getElementById('project-image').files[0];
          
            let imageURL = '';
          
            if (imageFile) {
              const fileName = `${Date.now()}_${imageFile.name}`;
              const { data, error } = await supabase.storage
                .from('project-images')
                .upload(fileName, imageFile);
          
              if (error) {
                showToast('❌ Image upload failed');
                console.error(error);
                return;
              }
          
              imageURL = supabase.storage
                .from('project-images')
                .getPublicUrl(fileName).data.publicUrl;
            }
          
            const { error } = await supabase.from('projects').insert([
              {
                title,
                category,
                description,
                status,
                tags,
                image_url: imageURL,
              }
            ]);
          
            if (error) {
              showToast('❌ Failed to save project');
              console.error(error);
            } else {
              showToast('✅ Project added!');
              addProjectForm.reset();
              fileNameDisplay.textContent = 'No file chosen';
              tagsContainer.innerHTML = '';
              initProjectsTable(); // Optional: refresh the table
            }
          
            // Switch back to projects section
            navLinks.forEach(link => link.parentElement.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
          
            document.querySelector('[data-section="projects-section"]').parentElement.classList.add('active');
            document.getElementById('projects-section').classList.add('active');
          });
          
        
        // Reset form
        this.reset();
        fileNameDisplay.textContent = 'No file chosen';
        tagsContainer.innerHTML = '';
        
        // Show success message
        showToast('Project added successfully');
        
        // Refresh projects table
        initProjectsTable();
        
        // Switch to projects section
        navLinks.forEach(link => link.parentElement.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        
        document.querySelector('[data-section="projects-section"]').parentElement.classList.add('active');
        document.getElementById('projects-section').classList.add('active');
    });

    // User dropdown
    userDropdownBtn.addEventListener('click', function() {
        userDropdown.classList.toggle('active');
    });

    // Close user dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!userDropdownBtn.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });

    // Modal close button
    modalClose.addEventListener('click', hideModal);
    modalCancel.addEventListener('click', hideModal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Toast close button
    toastClose.addEventListener('click', hideToast);

    // Initialize
    initProjectsTable();
    initCharts();

    // Responsive sidebar
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('show');
            mobileOverlay.classList.remove('show');
        }
    });

    // Handle orientation change for mobile devices
    window.addEventListener('orientationchange', function() {
        // Adjust charts and tables after orientation change
        setTimeout(() => {
            if (typeof Chart !== 'undefined') {
                Chart.instances.forEach(instance => {
                    instance.resize();
                });
            }
        }, 200);
    });
});