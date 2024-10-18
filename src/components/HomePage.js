import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://post-management-system-backend.onrender.com/api/posts/getPost');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://post-management-system-backend.onrender.com/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Posts</h1>
      <button 
        onClick={handleCreatePost}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mb-4"
      >
        Create Post
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              {post.image && (
                <img 
                  src={`https://post-management-system-backend.onrender.com/${post.image}`} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-600 mt-2">{post.description}</p>
                <div className="flex justify-between mt-4">
                  <button 
                    onClick={() => handleEdit(post._id)} 
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition duration-300"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(post._id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
