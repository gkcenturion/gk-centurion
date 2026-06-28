import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Button,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { supabase } from '../../lib/supabase';

type DocumentItem = {
  id: string;
  name: string;
  file_url: string;
  file_type: string;
  category: string | null;
  created_at: string;
};

function formatDate(value: string) {
  return new Date(value.endsWith('Z') ? value : `${value}Z`).toLocaleString(
    'en-ZA',
    {
      timeZone: 'Africa/Johannesburg',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }
  );
}

export default function DocumentsScreen() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  async function loadDocuments() {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setDocuments(data);
    }
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Back" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Dokumente</Text>
      </View>

      <ScrollView style={styles.list}>
        {documents.length === 0 ? (
          <Text style={styles.empty}>No documents yet.</Text>
        ) : (
          documents.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.thumbnail}>
                {item.file_type.toLowerCase().includes('image') ? (
                  <Image
                    source={{ uri: item.file_url }}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={styles.pdfIcon}>PDF</Text>
                )}
              </View>

              <View style={styles.details}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.meta}>{formatDate(item.created_at)}</Text>

                {item.category ? (
                  <Text style={styles.category}>{item.category}</Text>
                ) : null}

                <Button
                  title="Open"
                  onPress={() => Linking.openURL(item.file_url)}
                />
              </View>
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
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },

  thumbnail: {
    width: 90,
    height: 110,
    backgroundColor: '#e9eef2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },

  thumbnailImage: {
    width: '100%',
    height: '100%',
  },

  pdfIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b00020',
  },

  details: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  meta: {
    fontSize: 12,
    color: '#777',
    marginBottom: 6,
  },

  category: {
    fontSize: 12,
    color: '#1f6f8b',
    marginBottom: 8,
  },
});