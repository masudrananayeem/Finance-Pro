// ==========================================
// ===== NAVBAR - SHARED ACROSS ALL PAGES =====
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

    // ===== HAMBURGER TOGGLE =====
    const hamburger = document.querySelector('.hamburger-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('open');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });

        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                    navLinks.classList.remove('open');
                }
            }
        });
    }

    // ===== ACTIVE NAV LINK =====
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.closest('li')?.classList.add('active');
        }
    });

    // ===== NOTIFICATION =====
    document.querySelector('.notif-btn')?.addEventListener('click', function() {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const pending = transactions.filter(t => t.status === 'Pending');
        const count = pending.length || 3;
        alert(`📬 You have ${count} notification${count > 1 ? 's' : ''}`);
        const dot = this.querySelector('.notif-dot');
        if (dot) dot.style.display = 'none';
    });

    // ===== LOGOUT =====
    document.querySelector('.logout-btn')?.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            window.location.href = '../index.html';
        }
    });

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            this.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';

            if (typeof updateChartColors === 'function') {
                setTimeout(updateChartColors, 200);
            }
        });
    }

    // ===== PROFILE DROPDOWN =====
    document.querySelector('.profile-dropdown')?.addEventListener('click', function() {
        window.location.href = 'profile.html';
    });

    // ===== USER NAME =====
    const userName = localStorage.getItem('userName') || 'Nayeem';
    document.querySelectorAll('.profile-name, #userName').forEach(el => {
        if (el) el.textContent = userName;
    });

    // ===== GREETING =====
    const greetingEl = document.getElementById('greetingTime');
    if (greetingEl) {
        const hour = new Date().getHours();
        let greeting = 'Good Morning 👋';
        if (hour >= 12 && hour < 17) greeting = 'Good Afternoon ☀️';
        else if (hour >= 17 && hour < 21) greeting = 'Good Evening 🌅';
        else if (hour >= 21) greeting = 'Good Night 🌙';
        greetingEl.textContent = greeting;
    }

    // ===== CURRENT MONTH =====
    const monthEl = document.getElementById('currentMonth');
    if (monthEl) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const now = new Date();
        monthEl.textContent = `${months[now.getMonth()]} ${now.getFullYear()}`;
    }
});

// ==========================================
// ===== AUTH CHECK - FIXED =====
// ==========================================
(function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || '';

    // List of pages that don't require login
    const publicPages = ['index.html', ''];
    const isPublicPage = publicPages.includes(currentPage);

    // If NOT logged in and trying to access a protected page
    if (!isLoggedIn && !isPublicPage) {
        // Redirect to login page
        window.location.href = '../index.html';
        return;
    }

    // If logged in and on login page, redirect to dashboard
    if (isLoggedIn && isPublicPage) {
        // Check if we're in the root directory
        const pathParts = currentPath.split('/');
        // If we're in the root (not in pages folder)
        if (pathParts.length <= 2 || pathParts[pathParts.length - 2] === '') {
            window.location.href = 'pages/dashboard.html';
        }
        return;
    }
})();