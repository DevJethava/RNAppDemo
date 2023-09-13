export type AuthContextData = {
    authData?: AuthData;
    loading: boolean;
    signIn(data: AuthData): Promise<void>;
    signOut(): void;
};

export type AuthData = {
    token: string;
    data: string;
};

export type UserFirestoreData = {
    _id: string;
    fullName: string;
    profilePic: string;
    providersData: {
        displayName: string;
        email: string;
        phoneNumber: string | null;
        photoURL: string;
        providerId: string;
        uid: string;
    }
}