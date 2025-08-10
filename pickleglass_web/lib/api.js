// API configuration for the backend
let API_BASE_URL = null;

// Load runtime config to get the dynamic API URL
const loadRuntimeConfig = async () => {
  if (API_BASE_URL) return API_BASE_URL; // Already loaded
  
  try {
    const response = await fetch('/runtime-config.json');
    if (response.ok) {
      const config = await response.json();
      API_BASE_URL = config.API_URL;
      console.log('✅ Runtime config loaded, API URL:', API_BASE_URL);
      return API_BASE_URL;
    }
  } catch (error) {
    console.log('⚠️ Failed to load runtime config, using fallback:', error.message);
  }
  
  // Fallback to environment variable or default
  API_BASE_URL = process.env.NEXT_PUBLIC_pickleglass_API_URL || 'http://localhost:9001';
  return API_BASE_URL;
};

export const apiCall = async (endpoint, options = {}) => {
  const baseUrl = await loadRuntimeConfig();
  const url = `${baseUrl}${endpoint}`;
  
  console.log('🌐 Making API call to:', url);
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    console.error('❌ API call failed:', response.status, response.statusText);
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export default API_BASE_URL;
