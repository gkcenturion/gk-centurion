import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

import { supabase } from '../../lib/supabase';

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  group_name: string | null;
  created_at: string;
};

function formatSATime(value: string) {
  const isoValue = value.endsWith('Z') ? value : `${value}Z`;

  return new Date(isoValue).toLocaleString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  async function loadNotifications() {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setNotifications(data);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Back" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <ScrollView style={styles.list}>
        {notifications.length === 0 ? (
          <Text style={styles.empty}>No notifications yet.</Text>
        ) : (
          notifications.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.date}>
                {formatSATime(item.created_at)}
              </Text>

              <Text style={styles.body}>{item.body}</Text>

              {item.group_name ? (
                <Text style={styles.group}>Group: {item.group_name}</Text>
              ) : null}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 16, backgroundColor: '#fff' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 12 },
  list: { padding: 16 },
  empty: { color: '#666' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  body: { fontSize: 15, color: '#333' },
  group: { marginTop: 10, color: '#666' },
});