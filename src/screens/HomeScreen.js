import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, loadCreatedUsersFromStorageThunk } from '../features/users/usersSlice';
import {
  selectUsers,
  selectUsersStatus,
  selectIsLoadingUsers,
  selectUsersError,
  selectCurrentPage,
  selectTotalPages,
  selectHasPreviousPage,
  selectHasNextPage,
  selectIsLoadingFromStorage,
} from '../features/users/usersSelectors';
import UserCard from '../components/users/UserCard';
import UserForm from '../components/users/UserForm';
import LoadingIndicator from '../components/common/LoadingIndicator';
import ErrorMessage from '../components/common/ErrorMessage';
import SuccessMessage from '../components/common/SuccessMessage';
import PaginationControls from '../components/users/PaginationControls';

const HomeScreen = () => {
  const dispatch = useDispatch();
  
  const items = useSelector(selectUsers);
  const status = useSelector(selectUsersStatus);
  const is_loading_users = useSelector(selectIsLoadingUsers);
  const is_loading_from_storage = useSelector(selectIsLoadingFromStorage);
  const error = useSelector(selectUsersError);
  const current_page = useSelector(selectCurrentPage);
  const total_pages = useSelector(selectTotalPages);
  const has_previous = useSelector(selectHasPreviousPage);
  const has_next = useSelector(selectHasNextPage);
  
  const [refreshing, setRefreshing] = useState(false);
  const [show_success_message, setShowSuccessMessage] = useState(false);
  const [is_form_expanded, setIsFormExpanded] = useState(false);
  
  useEffect(() => {
    const loadInitialData = async () => {
      await dispatch(loadCreatedUsersFromStorageThunk());
      dispatch(fetchUsers(1));
    };
    loadInitialData();
  }, [dispatch]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchUsers(current_page));
    setRefreshing(false);
  }, [dispatch, current_page]);

  const handleUserSuccess = useCallback(() => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  }, []);

  const handlePreviousPage = useCallback(() => {
    if (has_previous && current_page > 1) {
      dispatch(fetchUsers(current_page - 1));
    }
  }, [dispatch, has_previous, current_page]);

  const handleNextPage = useCallback(() => {
    if (has_next && current_page < total_pages) {
      dispatch(fetchUsers(current_page + 1));
    }
  }, [dispatch, has_next, current_page, total_pages]);

  const toggleForm = useCallback(() => {
    setIsFormExpanded((prev) => !prev);
  }, []);

  const renderUser = useCallback(({ item, index }) => <UserCard item={item} index={index} />, []);

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header}>Gestor de Usuarios de Prueba</Text>
        <Text style={styles.header_subtitle}>
          {items.length} usuario{items.length !== 1 ? 's' : ''}
          {total_pages && ` - Página ${current_page}/${total_pages}`}
        </Text>
      </View>

      {total_pages && total_pages > 1 && (
        <PaginationControls
          current_page={current_page}
          total_pages={total_pages}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          has_previous={has_previous}
          has_next={has_next}
        />
      )}

      {is_loading_users && !refreshing && !is_loading_from_storage && (
        <LoadingIndicator />
      )}

      {error && status === 'failed' && !is_loading_users && (
        <ErrorMessage
          title="Error de conexión"
          message={
            error.includes('obtener')
              ? 'No se pudieron cargar los usuarios. Verifica tu conexión a internet.'
              : error
          }
          suggestion="Sugerencias:\n• Verifica que tengas conexión a internet activa\n• Intenta activar/desactivar el WiFi o datos móviles\n• Si el problema persiste, verifica la configuración de red"
          onRetry={() => dispatch(fetchUsers(current_page))}
        />
      )}

      <FlatList
        data={items}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : `user-${index}`
        }
        renderItem={renderUser}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={
          !is_loading_users && (
            <View style={styles.empty_container}>
              <Text style={styles.empty_text}>No hay usuarios todavía.</Text>
              <Text style={styles.empty_hint}>
                Crea tu primer usuario usando el botón de abajo
              </Text>
            </View>
          )
        }
        contentContainerStyle={
          items.length === 0 ? styles.empty_list_container : styles.list_container
        }
        showsVerticalScrollIndicator={true}
      />

      <TouchableOpacity
        style={styles.floating_button}
        onPress={toggleForm}
        activeOpacity={0.8}
      >
        <View style={styles.floating_button_content}>
          <Text style={styles.floating_button_icon}>
            {is_form_expanded ? '✕' : '+'}
          </Text>
          <Text style={styles.floating_button_text}>
            {is_form_expanded ? 'Cerrar' : 'Nuevo usuario'}
          </Text>
        </View>
      </TouchableOpacity>

      <SuccessMessage visible={show_success_message} />

      <UserForm
        isExpanded={is_form_expanded}
        onToggle={toggleForm}
        onSuccess={handleUserSuccess}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header_container: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  header_subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    fontWeight: '500',
  },
  list_container: {
    padding: 16,
    paddingBottom: 12,
  },
  empty_list_container: {
    flexGrow: 1,
  },
  empty_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  empty_text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  empty_hint: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  floating_button: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#00BCD4',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 20,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  floating_button_content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floating_button_icon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 8,
  },
  floating_button_text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

