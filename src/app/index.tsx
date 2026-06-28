import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import {
  Button,
  Image,
  Pressable,
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
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setLoggedIn(true);
      }

      setCheckingSession(false);
    }

    checkSession();
  }, []);

  async function sendOtp() {
    setMessage('');

    if (!email) {
      setMessage('Voer asseblief jou e-posadres in.');
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
    setMessage('Aanmeldkode gestuur. Gaan asseblief jou e-pos na.');
  }

  async function verifyOtp() {
    setMessage('');

    if (!otp) {
      setMessage('Voer asseblief die aanmeldkode in.');
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

  async function logout() {
    await supabase.auth.signOut();

    setLoggedIn(false);
    setEmail('');
    setOtp('');
    setCodeSent(false);
    setMessage('Jy is uitgeteken.');
  }

  if (checkingSession) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Laai GK Centurion...</Text>
      </View>
    );
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
        <Text style={styles.subtitle}>Welkom</Text>

       <View style={styles.grid}>
  <Pressable style={styles.tile} onPress={() => router.push('/calendar')}>
    <Text style={styles.tileText}>Kalender</Text>
  </Pressable>

  <Pressable style={styles.tile} onPress={() => router.push('/live')}>
    <Text style={styles.tileText}>Regstreeks</Text>
  </Pressable>

  <Pressable style={styles.tile} onPress={() => router.push('/notifications')}>
    <Text style={styles.tileText}>Nuus</Text>
  </Pressable>

  <Pressable style={styles.tile} onPress={() => {}}>
    <Text style={styles.tileText}>Stemmings</Text>
  </Pressable>



<Pressable style={styles.tile} onPress={() => router.push('/documents')}>
  <Text style={styles.tileText}>Dokumente</Text>
</Pressable>

  <Pressable style={styles.tile} onPress={() => {}}>
    <Text style={styles.tileText}>Profiel</Text>
  </Pressable>

  <Pressable style={[styles.tile, styles.logoutTile]} onPress={logout}>
    <Text style={styles.tileText}>Teken Uit</Text>
  </Pressable>
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
       placeholder="E-posadres"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!codeSent}
        />

        {!codeSent ? (
   <Button title="Stuur Aanmeldkode" onPress={sendOtp} />
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Aanmeldkode"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
            />

           <Button title="Verifieer Kode" onPress={verifyOtp} />
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

grid: {
  width: '100%',
  maxWidth: 420,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 12,
},

tile: {
  width: '30%',
  aspectRatio: 1,
  backgroundColor: '#1f6f8b',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 8,
},

logoutTile: {
  backgroundColor: '#b00020',
},

tileText: {
  color: '#fff',
  fontSize: 14,
  fontWeight: 'bold',
  textAlign: 'center',
},




  spacer: {
    height: 12,
  },
});