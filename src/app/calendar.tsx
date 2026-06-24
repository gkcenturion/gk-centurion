import { router } from 'expo-router';
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const events = [
  { date: '2026-06-28', title: 'Sunday Morning Service', time: '09:00' },
  { date: '2026-06-28', title: 'Sunday Evening Service', time: '18:00' },
  { date: '2026-07-02', title: 'Bible Study', time: '19:00' },
  { date: '2026-07-05', title: 'Youth Evening', time: '18:30' },
];

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('2026-06-28');

  const selectedEvents = events.filter((event) => event.date === selectedDate);

  const markedDates = events.reduce((acc, event) => {
    acc[event.date] = {
      marked: true,
      dotColor: '#1f6f8b',
      selected: event.date === selectedDate,
      selectedColor: '#1f6f8b',
    };
    return acc;
  }, {} as Record<string, any>);

  if (!markedDates[selectedDate]) {
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: '#1f6f8b',
    };
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Back" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Calendar</Text>
      </View>

      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
      />

      <ScrollView style={styles.events}>
        <Text style={styles.dateTitle}>{selectedDate}</Text>

        {selectedEvents.length === 0 ? (
          <Text style={styles.noEvents}>No events for this date.</Text>
        ) : (
          selectedEvents.map((event, index) => (
            <View key={index} style={styles.eventCard}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventTime}>{event.time}</Text>
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
  events: { padding: 16 },
  dateTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  noEvents: { color: '#666' },
  eventCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  eventTitle: { fontSize: 18, fontWeight: 'bold' },
  eventTime: { marginTop: 6, color: '#666' },
})