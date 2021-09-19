import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Settings } from 'react-native';
import Home from './Components/Home';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
        <Home></Home>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
