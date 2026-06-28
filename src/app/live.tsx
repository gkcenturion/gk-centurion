import { router } from 'expo-router';
import { Button, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function LiveScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.backButton}>
        <Button title="Back" onPress={() => router.back()} />
      </View>

      <View style={styles.playerWrapper}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },

  backButton: {
    padding: 12,
    backgroundColor: '#f5f5f5',
  },

  playerWrapper: {
    flex: 1,
    paddingBottom: 16,
    backgroundColor: '#000',
  },

  webview: {
    flex: 1,
  },
});