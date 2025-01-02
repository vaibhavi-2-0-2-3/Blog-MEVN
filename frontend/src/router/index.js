// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import BlogList from '@/components/BlogList.vue';
import BlogDetail from '@/components/BlogDetail.vue';
import BlogForm from '@/components/BlogForm.vue';

const routes = [
  { path: '/', component: BlogList },
  { path: '/blog/:id', component: BlogDetail, props: true },
  { path: '/add-blog', component: BlogForm },
  { path: '/edit-blog/:id', component: BlogForm, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
