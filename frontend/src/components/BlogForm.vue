<template>
  <div class="form-container">
    <h1 class="form-title">{{ isEdit ? 'Edit Blog' : 'Add New Blog' }}</h1>
    <form @submit.prevent="submitForm" class="blog-form">
      <div class="form-group">
        <label for="title">Title:</label>
        <input
          id="title"
          type="text"
          v-model="blog.title"
          required
          placeholder="Enter a captivating blog title"
        />
      </div>

      <div class="form-group">
        <label for="author">Author:</label>
        <input
          id="author"
          type="text"
          v-model="blog.author"
          required
          placeholder="Enter the author's full name"
        />
      </div>

      <div class="form-group">
        <label for="content">Content:</label>
        <textarea
          id="content"
          v-model="blog.content"
          required
          placeholder="Write the main content of the blog here"
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-btn">
          {{ isEdit ? 'Update Blog' : 'Create Blog' }}
        </button>
        <router-link to="/" class="cancel-btn">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { createBlog, getBlogById, updateBlog } from '../api/blog';

export default {
  data() {
    return {
      blog: {
        title: '',
        author: '',
        content: '',
      },
      isEdit: false,
    };
  },
  async created() {
    const blogId = this.$route.params.id;
    if (blogId) {
      this.isEdit = true;
      try {
        const response = await getBlogById(blogId);
        this.blog = response.data;
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        if (this.isEdit) {
          await updateBlog(this.blog._id, this.blog);
        } else {
          await createBlog(this.blog);
        }
        this.$router.push('/');
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  font-size: 2.2em;
  color: #2d3e50;
  margin-bottom: 20px;
  font-weight: 600;
}

.blog-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 1.1em;
  font-weight: 500;
  margin-bottom: 5px;
  color: #34495e;
}

.form-group input,
.form-group textarea {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
}

.form-group textarea {
  min-height: 180px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.submit-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 25px;
  font-size: 1em;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.submit-btn:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.cancel-btn {
  background-color: #ff6b6b;
  color: white;
  text-decoration: none;
  padding: 10px 25px;
  font-size: 1em;
  border-radius: 8px;
  display: inline-block;
  transition: background-color 0.3s, transform 0.2s;
}

.cancel-btn:hover {
  background-color: #e63946;
  transform: scale(1.05);
}
</style>
