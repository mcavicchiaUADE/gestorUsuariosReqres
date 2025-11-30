import { API_ENDPOINTS, API_CONFIG } from '../constants/api';

export const usersApi = {
  fetchUsers: async (page = 1) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USERS}?page=${page}`,
        {
          headers: {
            'x-api-key': API_CONFIG.API_KEY,
          },
        }
      );
      
      if (!response.ok) {
        const error_text = await response.text().catch(() => 'Error desconocido');
        throw new Error(`Error al obtener usuarios: ${response.status} ${response.statusText}. ${error_text}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Error de conexión. Verifica tu conexión a internet.');
      }
      throw error;
    }
  },

  createUser: async (user_data) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USERS}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_CONFIG.API_KEY,
          },
          body: JSON.stringify(user_data),
        }
      );
      
      if (!response.ok) {
        const error_text = await response.text().catch(() => 'Error desconocido');
        throw new Error(`Error al crear usuario: ${response.status} ${response.statusText}. ${error_text}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Error de conexión. Verifica tu conexión a internet.');
      }
      throw error;
    }
  },
};

