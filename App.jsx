/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './src/Stack/StackNavigator';





const App = ()=> {
  return (
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
  
  );
}

export default App;
