import React, { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { getUserToken, setUserToken, unsetUserToken } from '../utils/storageUtils';

export type AuthContextData = {
    authData?: AuthData;
    loading: boolean;
    signIn(data: AuthData): Promise<void>;
    signOut(): void;
};

export type AuthData = {
    token: string;
    email: string;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {

    const [authData, setAuthData] = useState<AuthData | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkLogin()
    }, [])

    const checkLogin = async (): Promise<void> => {
        await getUserToken().then((result) => {
            console.log(result)
            if (result !== null) {
                let data = JSON.parse(result) as AuthData
                setAuthData(data)
            }
        })
            .catch(error => console.log(error))
            .finally(() => {
                setLoading(false)
            })
    }

    const signIn = async (data: AuthData) => {
        await setUserToken(JSON.stringify(data)).then(() => {
            setAuthData(data);
        }).catch(error => console.log(error))
    };

    const signOut = async () => {
        await unsetUserToken().then(() => {
            setAuthData(undefined);
        }).catch(error => console.log(error))
    };

    return (
        <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider