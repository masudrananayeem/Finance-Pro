// ==========================================
// ===== PROFILE.JS =====
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    const userName = localStorage.getItem('userName') || 'Nayeem';
    const userEmail = localStorage.getItem('userEmail') || 'demo@financepro.com';

    document.getElementById('profileName')?.textContent = userName;
    document.getElementById('profileEmail')?.textContent = userEmail;

    // Show stats
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const summary = getTransactionSummary ? getTransactionSummary() : { totalIncome: 0, totalExpense: 0, count: 0 };

    document.getElementById('totalTransactions')?.textContent = summary.count || 0;
    document.getElementById('totalIncomeProfile')?.textContent = formatCurrency ? formatCurrency(summary.totalIncome || 0) : '৳0';
    document.getElementById('totalExpenseProfile')?.textContent = formatCurrency ? formatCurrency(summary.totalExpense || 0) : '৳0';

    // Edit profile
    document.getElementById('editProfileBtn')?.addEventListener('click', function() {
        const newName = prompt('Enter your name:', userName);
        if (newName && newName.trim()) {
            localStorage.setItem('userName', newName.trim());
            document.getElementById('profileName').textContent = newName.trim();
            document.querySelectorAll('.profile-name, #userName').forEach(el => {
                if (el) el.textContent = newName.trim();
            });
            alert('Profile updated successfully!');
        }
    });
});