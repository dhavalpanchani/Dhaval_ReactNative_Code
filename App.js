/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import NotificationsControl from './src/components/functional/NotificationsControl';
import Navigation from './src/navigation';

const App = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={styles.container}>
        <Navigation />
        <NotificationsControl />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
