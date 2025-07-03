import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../Components/Firebase/firebase.init';
import useSecurePublic from '../hooks/useSecurePublic';

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);
    const axiosPublic = useSecurePublic()

    const googleProvider = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider(); // Google প্রোভাইডার তৈরি
        return signInWithPopup(auth, provider) // পপআপ দিয়ে লগইন
            .finally(() => setLoading(false)); // লগইনের পরে লোডিং বন্ধ
    };


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email };
    
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        console.log('Token response:', res.data); // Debugging জন্য
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token); // টোকেন সংরক্ষণ
                            setLoading(false);
                        }
                    })
                    .catch(err => {
                        console.error('JWT Token Error:', err);
                    });
            } else {
                localStorage.removeItem('access-token'); // সঠিকভাবে টোকেন রিমুভ
                setLoading(false);
            }
            
        });
    
        return () => {
            unsubscribe();
        };
    }, [axiosPublic]);
    

    const AuthInfo = {
        user, loading, createUser, loginUser, logOut, googleProvider
    }
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;