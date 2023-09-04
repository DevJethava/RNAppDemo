import AsyncStorage from '@react-native-async-storage/async-storage';

/* USER TOKEN  */
export const setUserToken = async (token: string) => {
    await AsyncStorage.setItem('@authToken', `${token.toString()}`);
};
export const getUserToken = async () => await AsyncStorage.getItem('@authToken');
export const unsetUserToken = async () => {
    await AsyncStorage.removeItem('@authToken');
};
