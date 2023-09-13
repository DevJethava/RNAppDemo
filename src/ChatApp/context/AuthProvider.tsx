import React, { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { getUserToken, setUserToken, unsetUserToken } from '../utils/storageUtils';
import { AuthContextData, AuthData } from '../utils/Types';
import { getAuth, signOut as signOutFirebase } from 'firebase/auth';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {

    const [authData, setAuthData] = useState<AuthData | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkLogin()
    }, [])

    const checkLogin = async (): Promise<void> => {
        await getUserToken().then((result) => {
            // console.log(result)
            if (result !== null) {
                let data = JSON.parse(result) as AuthData
                setAuthData(data)
            }
        })
            .catch(error => console.log(error))
            .finally(() => {
                setInterval(() => {
                    setLoading(false)
                }, 2000)
            })
    }

    const signIn = async (data: AuthData) => {
        await setUserToken(JSON.stringify(data)).then(() => {
            setAuthData(data);
        }).catch(error => console.log(error))
    };

    const signOut = async () => {
        const auth = getAuth();
        await signOutFirebase(auth).then(() => {
            unsetUserToken().then(() => {
                setAuthData(undefined);
            }).catch(error => console.log(error))
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    };

    return (
        <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider