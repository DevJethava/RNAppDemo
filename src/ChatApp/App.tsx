/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import AuthProvider from './context/AuthProvider';

function App(): JSX.Element {
    return (
        <AuthProvider>
            <AppNavigation />
        </AuthProvider>
    );
}

const styles = StyleSheet.create({});

export default App;
