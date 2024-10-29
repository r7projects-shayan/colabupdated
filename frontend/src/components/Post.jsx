import React, { useState } from 'react';
import axios from 'axios';

function Post({ post, currentUser }) {
  const [comment, setComment] = useState('');

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:3000/api/posts/${post.id}/like`);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/posts/${post.id}/comment`, {
        userId: currentUser.id,
        content: comment,
      });
      setComment('');
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <p className="text-gray-800 text-lg mb-4">{post.content}</p>
      <div className="flex items-center justify-between mb-4">
        <button onClick={handleLike} className="text-blue-500 hover:text-blue-600">
          Like ({post.likes})
        </button>
        <span className="text-gray-500">{post.comments.length} comments</span>
      </div>
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {post.comments.map((comment) => (
          <p key={comment.id} className="text-gray-700 mb-2">
            {comment.content}
          </p>
        ))}
      </div>
      <form onSubmit={handleComment} className="mt-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
}

export default Post;