import React from 'react';
import Post from './Post';

function Feed({ posts, user }) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} currentUser={user} />
      ))}
    </div>
  );
}

export default Feed;