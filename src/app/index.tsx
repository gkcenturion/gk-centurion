import { router } from 'expo-router';
import { useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { supabase } from '../../lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  async function sendOtp() {
    setMessage('');

    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setCodeSent(true);
    setMessage('Login code sent. Please check your email.');
  }

  async function verifyOtp() {
    setMessage('');

    if (!otp) {
      setMessage('Please enter the login code.');
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: otp.trim(),
      type: 'email',
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setLoggedIn(true);
  }

  if (loggedIn) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/gk-logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>GK Centurion</Text>
        <Text style={styles.subtitle}>Welcome</Text>

        <View style={styles.card}>
         <Button
  title="Calendar"
  onPress={() => router.push('/calendar')}
/>

          <View style={styles.spacer} />

          <Button
            title="Watch Live"
            onPress={() => router.push('/live')}
          />

          <View style={styles.spacer} />

     <Button
  title="Notifications"
  onPress={() => router.push('/notifications')}
/>

          <View style={styles.spacer} />

          <Button title="Polls" onPress={() => {}} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/gk-logo.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>GK Centurion</Text>

      <Text style={styles.subtitle}>
        Gereformeerde Kerk Centurion
      </Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!codeSent}
        />

        {!codeSent ? (
          <Button title="Send Login Code" onPress={sendOtp} />
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Login code"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
            />

            <Button title="Verify Code" onPress={verifyOtp} />
          </>
        )}

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },

  message: {
    marginTop: 16,
    textAlign: 'center',
    color: '#333',
  },

  spacer: {
    height: 12,
  },
});