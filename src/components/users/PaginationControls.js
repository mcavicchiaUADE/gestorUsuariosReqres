import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PaginationControls = React.memo(({ current_page, total_pages, onPreviousPage, onNextPage, has_previous, has_next }) => {
  if (total_pages === null || total_pages <= 1) {
    return null;
  }

  return (
    <View style={styles.pagination_container}>
      <TouchableOpacity
        style={[styles.pagination_button, !has_previous && styles.pagination_button_disabled]}
        onPress={onPreviousPage}
        disabled={!has_previous}
        activeOpacity={0.8}
      >
        <Text style={[styles.pagination_button_text, !has_previous && styles.pagination_button_text_disabled]}>
          Anterior
        </Text>
      </TouchableOpacity>

      <View style={styles.pagination_info}>
        <Text style={styles.pagination_text}>
          Página {current_page} de {total_pages}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.pagination_button, !has_next && styles.pagination_button_disabled]}
        onPress={onNextPage}
        disabled={!has_next}
        activeOpacity={0.8}
      >
        <Text style={[styles.pagination_button_text, !has_next && styles.pagination_button_text_disabled]}>
          Siguiente
        </Text>
      </TouchableOpacity>
    </View>
  );
});

PaginationControls.displayName = 'PaginationControls';

const styles = StyleSheet.create({
  pagination_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  pagination_button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  pagination_button_disabled: {
    backgroundColor: '#E0E0E0',
  },
  pagination_button_text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  pagination_button_text_disabled: {
    color: '#999',
  },
  pagination_info: {
    flex: 1,
    alignItems: 'center',
  },
  pagination_text: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});

export default PaginationControls;

