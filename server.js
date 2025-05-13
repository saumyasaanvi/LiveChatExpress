const Message = require('./models/Message');
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Express Bot';

// MongoDB connection
const mongoURI = 'mongodb+srv://havoccreate94:6UWghXs9VLWM7YYI@cluster0.kc4wbtg.mongodb.net/real_time_chat_app?retryWrites=true&w=majority';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    socket.emit('message', formatMessage(botName, 'Hi there! Welcome to LiveChatExpress.'));

    socket.broadcast
      .to(user.room)
      .emit('message', formatMessage(botName, `${user.username} has joined the chat`));

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // 💾 Save messages to MongoDB
  socket.on('chatMessage', async msg => {
    const user = getCurrentUser(socket.id);
    const formattedMsg = formatMessage(user.username, msg);

    try {
      const message = new Message({
        username: user.username,
        room: user.room,
        text: msg,
        time: formattedMsg.time // Optional: reuse formatted time
      });

      await message.save();
    } catch (err) {
      console.error('Error saving message to MongoDB:', err);
    }

    io.to(user.room).emit('message', formattedMsg);
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '127.0.0.1', () => 
  console.log(`Server running on http://localhost:${PORT}`)
);
