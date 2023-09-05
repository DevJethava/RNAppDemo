import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { LogBox, Platform, View } from 'react-native';
import { themeColors } from '../theme';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    HomeIcon as HomeOutline,
    HeartIcon as HeartOutline,
    ShoppingBagIcon as BagOutline,
} from 'react-native-heroicons/outline';
import {
    HomeIcon as HomeSolid,
    HeartIcon as HeartSolid,
    ShoppingBagIcon as BagSolid,
} from 'react-native-heroicons/solid';
import ProductScreen from '../screens/ProductScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ios = Platform.OS == 'ios';
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    contentStyle: { backgroundColor: 'white' },
                }}>
                <Stack.Screen
                    name="Home"
                    options={{ headerShown: false }}
                    component={HomeTabs}
                />
                <Stack.Screen
                    name="Product"
                    options={{ headerShown: false }}
                    component={ProductScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;

const HomeTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => menuIcons(route, focused),
                tabBarStyle: {
                    marginBottom: 20,
                    height: 75,
                    alignItems: 'center',

                    borderRadius: 100,
                    marginHorizontal: 20,
                    backgroundColor: themeColors.bgLight,
                },
                tabBarItemStyle: {
                    marginTop: ios ? 30 : 0,
                },
            })}>
            <Tab.Screen name="home" component={HomeScreen} />
            <Tab.Screen name="favourite" component={HomeScreen} />
            <Tab.Screen name="cart" component={HomeScreen} />
        </Tab.Navigator>
    );
}

const menuIcons = (route, focused) => {
    let icon;

    if (route.name === 'home') {
        icon = focused ? (
            <HomeSolid size="30" color={themeColors.bgLight} className="shadow" />
        ) : (
            <HomeOutline size="30" strokeWidth={2} color="white" className="shadow" />
        );
    } else if (route.name === 'favourite') {
        icon = focused ? (
            <HeartSolid size="30" color={themeColors.bgLight} className="shadow" />
        ) : (
            <HeartOutline size="30" strokeWidth={2} color="white" className="shadow" />
        );
    } else if (route.name === 'cart') {
        icon = focused ? (
            <BagSolid size="30" color={themeColors.bgLight} className="shadow" />
        ) : (
            <BagOutline size="30" strokeWidth={2} color="white" className="shadow" />
        );
    }

    let buttonClass = focused ? 'bg-white' : '';
    return (
        <View
            className={'flex items-center rounded-full p-3 ' + buttonClass}>
            {icon}
        </View>
    );
};
