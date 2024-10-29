import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import Feed from './Feed';
import CreatePost from './CreatePost';

const socket = io('http://localhost:3000');

function Social() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();

    socket.on('newPost', (post) => {
      setPosts((prevPosts) => [post, ...prevPosts]);
    });

    socket.on('postLiked', ({ postId, likes }) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes } : post
        )
      );
    });

    socket.on('newComment', ({ postId, comment }) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, comment] }
            : post
        )
      );
    });

    return () => {
      socket.off('newPost');
      socket.off('postLiked');
      socket.off('newComment');
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route
            path="/"
            element={
              user ? (
                <div className="container mx-auto px-4 py-8">
                  <CreatePost user={user} />
                  <Feed posts={posts} user={user} />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default Social;