<template>
  <div class="blog-list-container">
    <h1 class="page-title">Blog Posts</h1>
    <div v-if="blogs.length" class="blog-posts">
      <div v-for="blog in blogs" :key="blog._id" class="blog-post-card">
        <h2 class="blog-title">{{ blog.title }}</h2>
        <p class="blog-author">By {{ blog.author }}</p>
        <router-link :to="`/blog/${blog._id}`" class="read-more-btn">Read More</router-link>
      </div>
    </div>
    <div v-else>
      <p class="no-blogs-message">No blog posts found. Please check back later!</p>
    </div>
    <router-link to="/add-blog" class="add-blog-btn">Add New Blog Post</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      blogs: [], // Will store the list of blogs
    };
  },
  created() {
    this.fetchBlogs(); // Call the function to fetch blogs when the component is created
  },
  methods: {
    // Method to fetch blogs from the backend
    fetchBlogs() {
      axios
        .get('http://localhost:5000/api/blogs')  // API endpoint to fetch blogs
        .then((response) => {
          this.blogs = response.data;  // Store the response data (blogs) in the blogs array
        })
        .catch((error) => {
          console.error('Error fetching blogs:', error);  // Log any error
        });
    },
  },
};
</script>

<style scoped>
.blog-list-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.page-title {
  text-align: center;
  font-size: 2.5em;
  color: #333;
  margin-bottom: 30px;
}

.blog-posts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.blog-post-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-post-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.blog-title {
  font-size: 1.8em;
  margin-bottom: 10px;
  color: #2c3e50;
}

.blog-author {
  font-size: 1.1em;
  color: #7f8c8d;
  margin-bottom: 20px;
}

.read-more-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 1em;
  text-align: center;
}

.read-more-btn:hover {
  background-color: #2980b9;
}

.no-blogs-message {
  text-align: center;
  font-size: 1.2em;
  color: #e74c3c;
}

.add-blog-btn {
  display: block;
  width: 200px;
  margin: 30px auto;
  padding: 12px 20px;
  text-align: center;
  background-color: #27ae60;
  color: white;
  text-decoration: none;
  font-size: 1.2em;
  border-radius: 4px;
}

.add-blog-btn:hover {
  background-color: #2ecc71;
}
</style>
