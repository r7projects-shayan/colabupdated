const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(bodyParser.json());

// In-memory data store (replace with a database in a real application)
let posts = [];
let users = [];

// Routes
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    const user = { id: users.length + 1, username, password };
    users.push(user);
    res.json({ message: 'User registered successfully', userId: user.id });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ message: 'Login successful', userId: user.id });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.post('/api/posts', (req, res) => {
    const { userId, content } = req.body;
    const post = { id: posts.length + 1, userId, content, likes: 0, comments: [] };
    posts.push(post);
    io.emit('newPost', post);
    res.json({ message: 'Post created successfully', postId: post.id });
});

app.post('/api/posts/:postId/like', (req, res) => {
    const { postId } = req.params;
    const post = posts.find(p => p.id === parseInt(postId));
    if (post) {
        post.likes++;
        io.emit('postLiked', { postId: post.id, likes: post.likes });
        res.json({ message: 'Post liked successfully', likes: post.likes });
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

app.post('/api/posts/:postId/comment', (req, res) => {
    const { postId } = req.params;
    const { userId, content } = req.body;
    const post = posts.find(p => p.id === parseInt(postId));
    if (post) {
        const comment = { id: post.comments.length + 1, userId, content };
        post.comments.push(comment);
        io.emit('newComment', { postId: post.id, comment });
        res.json({ message: 'Comment added successfully', commentId: comment.id });
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// WebSocket events
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));