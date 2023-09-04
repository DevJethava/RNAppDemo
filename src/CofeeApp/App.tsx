/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { styled } from 'nativewind';
import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const StyledView = styled(View)
const StyledText = styled(Text)

function App(): JSX.Element {
    return (
        <SafeAreaView className="flex-1">
            <StatusBar barStyle={'dark-content'} />
            <StyledView className="flex-1 items-center justify-center">
                <StyledText className="text-slate-800">Try editing me! 🎉</StyledText>
            </StyledView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
