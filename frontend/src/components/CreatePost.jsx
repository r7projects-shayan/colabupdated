import React, { useState } from 'react';
import axios from 'axios';

function CreatePost({ user }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/posts', {
        userId: user.id,
        content,
      });
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        rows="4"
      ></textarea>
      <button
        type="submit"
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
      >
        Post
      </button>
    </form>
  );
}

export default CreatePost;