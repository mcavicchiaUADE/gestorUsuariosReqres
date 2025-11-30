import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserCard = React.memo(({ item, index }) => {
  const full_name = item.first_name && item.last_name
    ? `${item.first_name} ${item.last_name}`
    : item.first_name || item.last_name || item.name || 'Usuario sin nombre';

  return (
    <View style={styles.card}>
      <View style={styles.card_header}>
        <View style={styles.badge}>
          <Text style={styles.badge_text}>#{index + 1}</Text>
        </View>
        {item.id && (
          <Text style={styles.card_id}>ID: {item.id}</Text>
        )}
      </View>
      <Text style={styles.user_name}>{full_name}</Text>
      {item.email && (
        <Text style={styles.user_email}>{item.email}</Text>
      )}
      {item.job && (
        <View style={styles.job_container}>
          <Text style={styles.job_label}>Puesto:</Text>
          <Text style={styles.job_text}>{item.job}</Text>
        </View>
      )}
    </View>
  );
});

UserCard.displayName = 'UserCard';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  card_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badge_text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  card_id: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  user_name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1A1A1A',
    lineHeight: 24,
  },
  user_email: {
    fontSize: 15,
    color: '#4A4A4A',
    lineHeight: 22,
    marginBottom: 8,
  },
  job_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  job_label: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
    marginRight: 6,
  },
  job_text: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
});

export default UserCard;

