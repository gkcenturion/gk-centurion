import { router } from 'expo-router';
import { Button, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function LiveScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <Button title="Back" onPress={() => router.back()} />
      </View>

      <WebView
        source={{
          uri: 'https://kerkdienstgemist.nl/streams/803909/embed',
        }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backButton: {
    padding: 12,
    backgroundColor: '#f5f5f5',
  },

  webview: {
    flex: 1,
  },
});