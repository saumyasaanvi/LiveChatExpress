# 💬 LiveExpressChat

**LiveExpressChat** is a real-time chat application built with **Node.js**, **Express**, **Socket.io**, and **MongoDB Atlas**. It enables users to join chat rooms, send messages, and view active participants — all in real-time.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-18.x-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/mongoDB-Atlas-green.svg)
![Socket.io](https://img.shields.io/badge/socket.io-Real--Time-lightgrey.svg)

---

## 🚀 External Access

You can access the chat app externally using **Ngrok**

> Replace this with your actual Ngrok URL when deploying.

---

## 🛠️ Tech Stack

### 💻 Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Socket.io (Server)**: Real-time bi-directional communication
- **MongoDB Atlas**: Cloud-based database for storing messages
- **Mongoose**: ODM for MongoDB
- **Custom Utilities**:
  - `formatMessage()`: Timestamp and format messages
  - `userJoin()`, `getCurrentUser()`, `userLeave()`, `getRoomUsers()`: Handle user sessions and room data

### 🌐 Frontend
- **HTML5 / CSS3 / JavaScript**
- **Socket.io (Client)**: Handles WebSocket connections and events
- **Static Assets**: Served from the `public/` directory

### 🌍 Deployment Tools
- **Ngrok**: Secure tunnels for public access to local development server

---

## 📁 Project Structure

LiveExpressChat/
│
├── models/
│ └── Message.js # Mongoose schema for chat messages
│
├── public/
│ ├── index.html # Main frontend page
│ └── js/
│ └── main.js # Socket.io client logic
│
├── utils/
│ ├── messages.js # Message formatting utility
│ └── users.js # Room/user management
│
├── server.js # Main server file
└── README.md

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/LiveExpressChat.git
cd LiveExpressChat
```
### 2.  Install Dependencies
``` bash
npm install
```
### 3.  Configure Environment
``` bash
const mongoURI = 'your-mongo-db-atlas-uri';
```
### 4. Start the Server
``` bash
node server.js
```
### 5. Run Ngrok (Optional for public access)
``` bash
ngrok http 3000
```
✨ Features
✅ Join chat rooms with a username

✅ Real-time messaging using WebSockets

✅ Auto-scroll and timestamped messages

✅ MongoDB message storage for persistence

✅ Notifications when users join/leave

✅ View active users in a room

✅ Scalable and production-ready architecture

🧪 Testing
You can test the app locally by opening multiple browser tabs and joining the same room with different usernames.

🛡️ Security Notes
Always store credentials (like MongoDB URIs) in environment variables.

Consider rate-limiting or message filtering for production environments.

📜 License
This project is licensed under the MIT License.

🙌 Acknowledgements
Socket.io

MongoDB Atlas

Ngrok

Express.js

### Developed by Saumya Saanvi
