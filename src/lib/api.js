/**
 * SS Infotech Frontend API Client Helper
 * Interacts with Node.js Express backend (http://localhost:5000/api/v1)
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function apiFetch(endpoint, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  } catch (error) {
    console.warn(`[API FETCH WARNING] Call to ${endpoint} failed:`, error.message);
    throw error;
  }
}

// Dedicated API service methods
export const api = {
  // Submit Contact Form
  submitContact: (formData) =>
    apiFetch('/contacts', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),

  // Subscribe to Newsletter
  subscribeNewsletter: (email) =>
    apiFetch('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  // Get Services
  getServices: () => apiFetch('/services'),

  // Get Portfolio Projects
  getProjects: (category) =>
    apiFetch(`/projects${category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : ''}`),

  // Get Testimonials
  getTestimonials: () => apiFetch('/testimonials'),

  // Get Partners
  getPartners: () => apiFetch('/partners'),

  // Admin Auth
  login: (credentials) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
};
