import AsyncStorage from '@react-native-async-storage/async-storage';

const CREATED_USERS_STORAGE_KEY = '@gestor_usuarios_created';

export const saveCreatedUsersToStorage = async (users) => {
  try {
    const jsonValue = JSON.stringify(users);
    await AsyncStorage.setItem(CREATED_USERS_STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error al guardar usuarios creados en storage:', error);
  }
};

export const loadCreatedUsersFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CREATED_USERS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error al cargar usuarios creados desde storage:', error);
    return null;
  }
};

