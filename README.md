<div align="center">

# 💰 Finance Pro

### Personal Finance Management Dashboard

*Track transactions · Manage budgets · Set goals · Grow your savings*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)]()
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)]()

</div>


---

## 📌 Project Overview

**Finance Pro** is a sleek, fully client-side personal finance management web app. It lets users log in, track income and expenses, set budgets and savings goals, visualize spending with interactive charts, and manage everything from a clean, responsive dashboard — all with **dark mode** support and **zero backend** (data is stored locally in the browser via `localStorage`).

| | |
|---|---|
| 🧩 **Type** | Client-side web app (HTML, CSS, JavaScript) |
| 💾 **Data Storage** | Browser `localStorage` (no server/database required) |
| 🎨 **Theme** | Light / Dark mode with persistence |
| 📱 **Design** | Fully responsive (desktop, tablet, mobile) |

---

## 🚀 Core Features

| # | Feature | Description |
|---|---|---|
| 1 | 🔐 **Authentication** | Simple login system with session persistence via `localStorage` |
| 2 | 📊 **Dashboard** | Greeting banner, balance/income/expense stat cards, spending chart, quick actions, goal previews, recent transactions |
| 3 | 💸 **Transactions** | Add, view, filter, and delete income/expense records with category, date, description, and status |
| 4 | 📈 **Budget** | Create and monitor category-wise monthly budgets |
| 5 | 🎯 **Goals** | Set savings/financial goals with progress tracking |
| 6 | 🐷 **Savings** | Dedicated module to track savings pots/accounts |
| 7 | 📝 **Notes** | Personal finance notes and reminders |
| 8 | ⚙️ **Settings** | App preferences, including dark mode toggle |
| 9 | 👤 **Profile** | View/edit user info, account stats (total transactions, income, expenses), clear all data |
| 10 | 🌙 **Dark Mode** | Site-wide toggle with `localStorage` persistence |
| 11 | 📉 **Interactive Charts** | Category-wise spending bar chart (Chart.js), auto-updates with theme and data changes |
| 12 | 📤 **CSV Export** | Export all transactions/finance data to CSV |
| 13 | 🔔 **Notifications** | Pending transaction alerts via notification bell |
| 14 | 🍔 **Responsive Navbar** | Collapsible sidebar/hamburger menu for mobile devices |

---

## 📁 Project Structure

```
finance-pro/
│
├── index.html                  # Login page
│
├── pages/
│   ├── dashboard.html           # Main dashboard
│   ├── transactions.html        # Transaction history & management
│   ├── budget.html              # Budget planner
│   ├── goals.html                # Financial goals tracker
│   ├── savings.html             # Savings tracker
│   ├── notes.html                # Notes module
│   ├── settings.html            # App settings
│   └── profile.html             # User profile
│
├── css/
│   ├── style.css                 # Base/global styles
│   ├── login.css                 # Login page styles
│   ├── dashboard.css            # Dashboard & shared component styles
│   └── darkmode.css             # Dark mode theme overrides
│
├── js/
│   ├── app.js                    # Shared utility functions (export, currency, month helpers)
│   ├── auth.js                   # Login/logout & authentication logic
│   ├── navbar.js                 # Shared navbar, theme toggle, auth guard
│   ├── transactions.js          # Transaction CRUD & summary logic
│   ├── chart.js                  # Chart.js spending visualization
│   ├── profile.js                # Profile data & edit logic
│   └── settings.js               # Settings & dark mode logic
│
├── assets/
│   ├── favicon_io/               # Favicon package
│   ├── icons/                    # Logo & icons
│   └── images/                   # Profile & UI images
│
└── README.md                     # This file
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure |
| **CSS3** | Styling, responsive layout, dark mode |
| **JavaScript (ES6)** | App logic, DOM manipulation, data handling |
| **Bootstrap 5.3.8** | Grid system & UI components |
| **Bootstrap Icons 1.11.3** | Icon set |
| **Chart.js** | Spending category visualization |
| **Browser `localStorage`** | Client-side data persistence |

---

## 🔧 Installation & Setup

### Prerequisites

- Any modern web browser
- VS Code (recommended) with **Live Server** extension

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/<your-username>/finance-pro.git
cd finance-pro
```

**2. Run the app**
```
Right-click index.html → "Open with Live Server"
```
> Or simply open `index.html` directly in your browser.

**3. Login**

| Field | Value |
|---|---|
| Email | `admin@gmail.com` |
| Password | `123456` |

> ⚠️ This is a demo credential hardcoded in `auth.js`. Replace with real authentication (e.g. Firebase Auth, a backend API) before deploying publicly.

---

## 📄 Pages

| Page | File | Description |
|---|---|---|
| Login | `index.html` | Entry point / authentication |
| Dashboard | `pages/dashboard.html` | Overview of balance, income, expenses, chart, goals |
| Transactions | `pages/transactions.html` | Full transaction log with add/delete/filter |
| Budget | `pages/budget.html` | Category budget planning |
| Goals | `pages/goals.html` | Savings & financial goal tracking |
| Savings | `pages/savings.html` | Savings pots/accounts overview |
| Notes | `pages/notes.html` | Personal finance notes |
| Settings | `pages/settings.html` | Preferences & dark mode |
| Profile | `pages/profile.html` | User details, stats, and account actions |

---

## 💾 Data Model (localStorage keys)

| Key | Description |
|---|---|
| `isLoggedIn` | Boolean login/session flag |
| `userName` | Display name of the current user |
| `userEmail` | Email of the current user |
| `theme` | `"dark"` or `"light"` — current theme preference |
| `transactions` | Array of transaction objects (`id`, `type`, `category`, `amount`, `date`, `description`, `status`) |
| `budgets` | Array of budget entries |
| `goals` | Array of financial goal entries |
| `savings` | Array of savings entries |
| `notes` | Array of note entries |

---

## 📱 Responsive Design

| Breakpoint | Behavior |
|---|---|
| `> 1024px` | Full navbar with labels, multi-column dashboard grid |
| `768px – 1024px` | Icon-only nav links, collapsed profile info |
| `≤ 768px` | Hamburger menu, stacked single/double-column layout |
| `≤ 480px` | Compact stat cards & action buttons for small phones |

---

## 🎯 Roadmap

- [ ] Backend integration (real authentication & database)
- [ ] Multi-currency support
- [ ] Recurring transactions
- [ ] Data visualization for budgets vs. actuals
- [ ] PDF report export
- [ ] Multi-user support
- [ ] PWA / offline support

---

## 🐛 Known Issues

| Issue | Notes |
|---|---|
| Data stored in `localStorage` | Clearing browser data/cache will erase all records |
| Hardcoded login credentials | Not suitable for production without a real auth backend |
| Single-device data | No cloud sync between devices/browsers |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "Add YourFeature"`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 📝 License

This project is open for personal and educational use. Add a license of your choice (MIT, Apache 2.0, etc.) here, e.g.:

```
MIT License © 2026 [Your Name]
```

---

## 🙏 Acknowledgments

- **Bootstrap** — Grid system & components
- **Bootstrap Icons** — Icon set
- **Chart.js** — Data visualization

---

<div align="center">

**Built with using HTML, CSS & JavaScript**

*Finance Pro © 2026*

</div>
