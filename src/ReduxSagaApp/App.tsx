/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './redux';
import CartScreen from './screens/CartScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import UserScreen from './screens/UserScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={CartScreen} />
                    <Stack.Screen name="User" component={UserScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({});

export default App;
