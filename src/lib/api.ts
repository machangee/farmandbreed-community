import { useAuth } from './auth';

const API_URL = 'https://api.farmandbreed.com/v1';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const { token, refreshToken } = useAuth.getState();
  
  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (response.status === 401) {
    // Token expired, try to refresh
    await refreshToken();
    // Retry the request with new token
    return fetchWithAuth(endpoint, options);
  }

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  ai: {
    analyzeCrop: async (imageFile: File) => {
      const formData = new FormData();
      formData.append('image', imageFile);

      return fetchWithAuth('/ai/analyze-crop', {
        method: 'POST',
        body: formData,
        headers: {}, // Let browser set content-type for FormData
      });
    },
    
    getPestControl: (cropType: string, pestType: string) =>
      fetchWithAuth(`/ai/pest-control?crop=${cropType}&pest=${pestType}`),
      
    getSoilRecommendations: (soilData: any) =>
      fetchWithAuth('/ai/soil-recommendations', {
        method: 'POST',
        body: JSON.stringify(soilData),
      }),
  },

  weather: {
    getForecast: (latitude: number, longitude: number) =>
      fetchWithAuth(`/weather/forecast?lat=${latitude}&lon=${longitude}`),
      
    getAlerts: (region: string) =>
      fetchWithAuth(`/weather/alerts?region=${region}`),
  },

  chat: {
    getMessages: (conversationId: string) =>
      fetchWithAuth(`/chat/${conversationId}`),
      
    sendMessage: (conversationId: string, message: string) => {
      const promise = fetchWithAuth(`/chat/${conversationId}`, {
        method: 'POST',
        body: JSON.stringify({ message }),
      });
      
      return promise;
    },
  },

  marketplace: {
    listProducts: (filters?: any) =>
      fetchWithAuth('/marketplace/products', {
        method: 'GET',
        ...(filters && { body: JSON.stringify(filters) }),
      }),
      
    createListing: (productData: any) =>
      fetchWithAuth('/marketplace/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      }),
      
    updateListing: (productId: string, updates: any) =>
      fetchWithAuth(`/marketplace/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      }),
  },
};