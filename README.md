# 📘 Elimu-Online

Elimu-Online is a modern, responsive e-learning platform built for students and teachers to access categorized digital learning resources. It supports user registration, login, file uploads, categorized browsing, and secure downloads with support for payment integration and admin panels.

---

## ✨ Features

✅ Full-stack application (Flask + Vanilla JS + Tailwind CSS)
✅ User and Admin Authentication
✅ Upload and organize resources (Notes, Exams, Schemes of Work, etc.)
✅ Integration with Google Cloud Storage for secure file handling
✅ Responsive UI with image sliders, modals, and collapsible sidebar
✅ Protected file access with token-based authentication
✅ Toast notifications, file previews, and pagination support
✅ Mpesa and Paystack integration for paid content access (in progress)

---

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, JavaScript, TailwindCSS, Vite
- **Backend**: Flask, SQLAlchemy, Python, Pipenv
- **Storage**: Google Cloud Storage (GCS)
- **Deployment**: Cloudflare Pages (Frontend), Render (Backend)

## 🚀 Getting Started

### 🖥️ Backend Setup (Flask + Pipenv)

```bash
cd server
pipenv install
pipenv shell
python run.py
```

- Flask API will run at: `http://127.0.0.1:5555/`
- Ensure your GCS Bucket is named `elimu-online-resources` and properly authenticated.

### 🌐 Frontend Setup (Vite + Tailwind)

```bash
cd client
npm install
npm run dev
```

- Frontend runs at: `http://localhost:5173/`

If using Console Ninja, note: **Vite v5.4.18 support for Community edition is expected around June 10, 2025.**

## 📁 Project Structure

```
Elimu-Online/
├── client/             # Frontend (HTML, JS, Tailwind, Vite)
│   ├── index.html
│   ├── src/
│   └── public/images/
├── server/             # Backend (Flask + SQLAlchemy)
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── migrations/
│   └── run.py
├── README.md
└── Pipfile / package.json
```

## 🤝 Contributing

We welcome contributions from developers, teachers, and digital education enthusiasts!

- Fork this repo
- Create your feature branch (`git checkout -b feature/YourFeature`)
- Commit your changes (`git commit -m 'Add amazing feature'`)
- Push to the branch (`git push origin feature/YourFeature`)
- Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- Developed during Phase 5 at Moringa School
- Thanks to mentors and teammates who provided feedback and support
- Icons and assets courtesy of [Heroicons](https://heroicons.com/) and open-source tools

---

Created By Paul
© 2025 Elimu-Online. All rights reserved.
