// ==========================================
// ===== APP - SHARED FUNCTIONS =====
// ==========================================

// ===== EXPORT DATA =====
function exportData() {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    if (transactions.length === 0) { alert('No data to export!'); return; }
    let csv = 'Date,Category,Type,Amount,Description,Status\n';
    transactions.forEach(t => {
        csv += `${t.date},${t.category},${t.type},${t.amount},${t.description || ''},${t.status || 'Completed'}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finance_data_export.csv';
    a.click();
    URL.revokeObjectURL(url);
    alert('Data exported successfully!');
}

// ===== FORMAT CURRENCY =====
function formatCurrency(amount) {
    return '৳' + amount.toFixed(2);
}

// ===== GET MONTH NAME =====
function getMonthName(monthIndex) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
}

// ===== GET CURRENT MONTH =====
function getCurrentMonth() {
    const now = new Date();
    return { month: now.getMonth(), year: now.getFullYear(), name: getMonthName(now.getMonth()) };
}