import React from 'react';

export default function PostIndex({posts}) {
  return (
    <ul>
      {posts.map(post => {
        return (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <img src={post.photoUrl}/>
          </li>
        );
      })}
    </ul>
  );
}
