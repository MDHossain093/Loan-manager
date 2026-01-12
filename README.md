

# 💰 CashNex (Loan Manager)



![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat&logo=next.js)

![React](https://img.shields.io/badge/React-18.3-blue?style=flat&logo=react)

![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)

![License](https://img.shields.io/badge/License-MIT-green)**CashNex** is a comprehensive personal finance and loan management application built with **Next.js**. It allows users to track their incomes, expenses, loans (borrowed), and lends (given), providing a clear view of their net financial standing.



The app features a modern, glassmorphism-inspired UI, full PWA support, and local data persistence.



---## ✨ Key Features* **💸 Complete Transaction Tracking**: Log four distinct types of transactions:    * **Income**: Money coming in.    * **Expense**: Money going out (categorized).    * **Loan**: Money you borrowed from others.    * **Lend**: Money you lent to others.* **📊 Smart Dashboard**: Instantly view your:    * Total Loan vs. Total Lend.    * Net Balance calculations.    * Recent transactions list.* **📈 Reports & Analytics**:    * **Monthly Summary**: Breakdown of finances by month.    * **Category Analysis**: See where your expenses are going.    * **Top Transactions**: Highlight your largest loans, lends, or expenses.* **💾 Local Persistence**: Uses **Zustand** with local storage to keep your data safe on your device without needing a backend.* **📤 Data Export**: Export your entire financial history to **JSON** or **CSV** formats.* **🌙 Dark Mode**: Fully responsive UI with a built-in dark mode toggle.* **📱 PWA Ready**: Installable on mobile devices for a native app-like experience.



---## 🛠️ Tech Stack* **Framework**: [Next.js](https://nextjs.org/) (Pages Router)* **Styling**: [Tailwind CSS](https://tailwindcss.com/)* **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with `persist` middleware)* **Icons**: [Heroicons](https://heroicons.com/)* **Animations**: [Framer Motion](https://www.framer.com/motion/)



---## 🚀 Getting Started



Follow these steps to run the project locally.### Prerequisites* Node.js (v18 or later recommended)* npm, yarn, pnpm, or bun### Installation1.  **Clone the repository:**    ```bash

    git clone [https://github.com/your-username/loan-manager.git](https://github.com/your-username/loan-manager.git)

    cd loan-manager

    ```2.  **Install dependencies:**    ```bash

    npm install

    # or

    yarn install

    ```3.  **Start the development server:**    ```bash

    npm run dev

    ```4.  **Open the app:**    Visit [http://localhost:3000](http://localhost:3000) in your browser.

---## 📂 Project Structure```bash

.

├── lib/

│   └── store.js         # Zustand store for transaction state & logic

├── public/              # Static assets (icons, manifest.json)

├── src/

│   ├── components/      # Reusable UI components (TransactionForm, etc.)

│   ├── hooks/           # Custom hooks (useDarkMode)

│   ├── pages/           # Application routes

│   │   ├── index.js     # Home / Overview

│   │   ├── dashboard.js # Detailed transaction management

│   │   ├── reports.js   # Analytics & Export

│   │   ├── add-*.js     # Pages for adding specific transactions

│   │   └── _app.js      # Global layout wrapper

│   └── styles/          # Global Tailwind CSS styles

└── package.json

📸 Usage Guide

Adding Data: Use the "Quick Actions" on the home screen to add a new Loan, Lend, Income, or Expense.

Managing Data: Go to the Dashboard to search, filter, edit, or delete specific transactions.

Exporting: Navigate to the Reports page to download your data as a CSV file for Excel/Google Sheets or a JSON backup.

Resetting: Need a fresh start? Use the "Reset All Data" button in the Dashboard (Warning: This is irreversible).

🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
