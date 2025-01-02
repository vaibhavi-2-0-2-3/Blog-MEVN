<template>
  <div v-if="blog" class="blog-detail">
    <h1>{{ isEdit ? 'Edit Blog' : 'Blog Detail' }}</h1>
    <form v-if="isEdit" @submit.prevent="submitForm">
      <label>Title:</label>
      <input v-model="blog.title" required />

      <label>Author:</label>
      <input v-model="blog.author" required />

      <label>Content:</label>
      <textarea v-model="blog.content" required></textarea>

      <button type="submit">Update Blog</button>
      <router-link to="/" class="cancel-btn">Cancel</router-link>
    </form>
    <div v-else>
      <p><strong>Title:</strong> {{ blog.title }}</p>
      <p><strong>Author:</strong> {{ blog.author }}</p>
      <div><strong>Content:</strong> {{ blog.content }}</div>
      
      <div class="actions">
        <button @click="deleteBlog" class="delete-btn">Delete Blog</button>
        <button @click="enableEdit" class="edit-btn">Edit Blog</button>
        <router-link to="/" class="back-btn">Back to Blog List</router-link>
      </div>
    </div>
  </div>

  <div v-else class="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
import { getBlogById, deleteBlog, updateBlog } from '../api/blog';

export default {
  data() {
    return {
      blog: null,
      isEdit: false,
    };
  },
  async created() {
    const blogId = this.$route.params.id;
    if (blogId) {
      try {
        const response = await getBlogById(blogId);
        this.blog = response.data;
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }
  },
  methods: {
    async deleteBlog() {
      const blogId = this.$route.params.id;
      if (blogId) {
        try {
          await deleteBlog(blogId);
          this.$router.push('/'); // Redirect to blog list page after deletion
        } catch (error) {
          console.error("Error deleting blog:", error);
        }
      }
    },
    enableEdit() {
      this.isEdit = true;
    },
    async submitForm() {
      const blogId = this.$route.params.id;
      if (blogId) {
        try {
          await updateBlog(blogId, this.blog); // Update the blog
          this.$router.push('/'); // Redirect after update
        } catch (error) {
          console.error("Error updating blog:", error);
        }
      }
    }
  }
};
</script>

<style scoped>
.blog-detail {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.blog-detail h1 {
  font-size: 2em;
  margin-bottom: 10px;
}

.blog-detail p {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.blog-detail .content {
  margin-bottom: 20px;
  line-height: 1.5;
}

form {
  display: flex;
  flex-direction: column;
}

form input,
form textarea {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  margin: 10px;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  padding: 10px;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.edit-btn {
  background-color: #3498db;
  color: white;
  margin-left: 20px;
  margin-right: 20px;
}

.edit-btn:hover {
  background-color: #2980b9;
}

.cancel-btn {
  padding: 10px 15px;
  font-size: 1em;
  text-decoration: none;
  background-color: #f39c12;
  color: white;
  border-radius: 4px;
}

.cancel-btn:hover {
  background-color: #e67e22;
}

.back-btn {
  padding: 10px 15px;
  font-size: 1em;
  text-decoration: none;
  background-color: #3498db;
  color: white;
  border-radius: 4px;
}

.back-btn:hover {
  background-color: #2980b9;
}

.loading {
  text-align: center;
  margin-top: 50px;
}
</style>
