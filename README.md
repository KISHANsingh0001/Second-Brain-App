# 🧠 Second Brain

A modern, full-stack content management platform to store, organize, and share your favorite YouTube videos, playlists, Shorts, Tweets, and links—all in one place.

Built with **React + TypeScript + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## 🚀 Features

- **Multi-Content Support**: Save YouTube videos, playlists, Shorts, Tweets, and any web link.  
- **Beautiful Dashboard**: Responsive, dark-mode enabled, and animated UI for a delightful experience.  
- **Easy Organization**: Add titles, descriptions, and tags to your content.  
- **One-Click Sharing**: Generate secure, shareable links for your curated content.  
- **Secure Authentication**: JWT-based login/signup with hashed passwords.  
- **Delete & Manage**: Remove or update your content anytime.  
- **Mobile Friendly**: Works seamlessly on all devices.  
- **Popover Share**: Instantly copy or preview your shareable link.  
- **Smart Sidebar**: Sidebar auto-collapses on small screens for a clutter-free view.  

---

## 📸 Snapshots
![Dashboard (Light)](
https://github.com/user-attachments/assets/c32a0c16-f714-4ecf-95d9-ac833082eb9e
)  

![Dashboard (Dark)](
https://github.com/user-attachments/assets/2b5e0c58-4abc-4f5f-bb2a-1b15581ada74
)  

![AddContent (Dark)](
https://github.com/user-attachments/assets/c6657eac-51ba-4667-8e11-b7040985a702
)  

![Share Modal](
https://github.com/user-attachments/assets/e2d7105b-5eb2-4d4d-8479-495ef99f669e
)  

![Responsive Sidebar](
https://github.com/user-attachments/assets/894d7963-e55a-4d59-b111-f3a5cef36b3f
)

---

## 💡 Why Second Brain?

Traditional bookmarking tools are limited and often become cluttered or hard to search. **Second Brain** solves this by:

1. **Centralizing** all your content types (videos, tweets, links) in one dashboard.  
2. Enabling **rich metadata** (title, description, tags) for better search and recall.  
3. Providing **instant sharing** with secure, revocable links.  
4. Supporting **dark mode** and responsive layouts for modern workflows.  
5. Minimizing cognitive overload by making your digital knowledge easily accessible and organized.  

---

## 🛠️ How It Works

1. **Sign Up & Sign In**  
   - Create an account with your email and a secure password.  
   - JWT authentication keeps your data safe.

2. **Add Content**  
   - Use the **Add Content** button to save YouTube videos, playlists, Shorts, Tweets, or any link.  
   - Add a title and description for context.

3. **Organize & View**  
   - All your content appears in a beautiful, filterable dashboard.  
   - Use tags and search to quickly find what you need.

4. **Share Instantly**  
   - Click **Share Content** to generate a unique, secure link.  
   - Share this link with anyone—no login required for viewers.  
   - Disable sharing anytime to revoke access.

5. **Responsive & Accessible**  
   - Sidebar auto-collapses on small screens.  
   - Dark mode for night owls.  
   - Fast, animated UI for a delightful experience.

---

## 🏆 Advantages Over Traditional Methods

- No more scattered bookmarks across browsers and devices.  
- Rich previews for videos and tweets, not just plain links.  
- Easy sharing without exposing your entire account or using third-party services.  
- Full control—revoke share links anytime.  
- Modern UI/UX with accessibility and responsiveness in mind.  

---

## ⚙️ Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS, Ant Design, Framer Motion  
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt  
- **Other:** Zod (validation), Axios, React Icons  

---

## 📝 Getting Started

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/second-brain.git
   cd second-brain
   cd brainly-backend
2. **Setup Backend**  
   ```bash
   cd brainly-backend
   cp src/config.example.ts src/config.ts
   # Edit src/config.ts with your MongoDB URI and JWT secret
   npm install
   npm run dev
3. **Setup Frontend**  
   ```bash
   cd ../brainly-frontend
   npm install
   npm run dev

4.	Open in Browser
Visit http://localhost:5173 (or the port shown in your terminal).

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

📄 License
© 2025 Kishan Singh Thakur. All rights reserved.
This project is licensed under the MIT License.

---


