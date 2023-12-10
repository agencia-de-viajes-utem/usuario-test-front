import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { loginOnBackend, registerOnBackend } from '../api';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(Cookies.get('token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const newToken = await currentUser.getIdToken();
                Cookies.set('token', newToken, { domain: `${import.meta.env.VITE_USER_DOMAIN}` });
                setToken(newToken);
                setIsAuthenticated(true);
                setUser(currentUser);
            } else {
                Cookies.remove('token', { domain: `${import.meta.env.VITE_USER_DOMAIN}` });
                setToken(null);
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);


    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const newToken = await userCredential.user.getIdToken();
            Cookies.set('token', newToken, { domain: `${import.meta.env.VITE_USER_DOMAIN}` });
            setToken(newToken);
            setUser(userCredential.user);
            await loginOnBackend(newToken);
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            Cookies.remove('token', { domain: `${import.meta.env.VITE_USER_DOMAIN}` });
            setToken(null);
            setUser(null);
        } catch (error) {
            console.error('Error al cerrar sesión:', error.message);
        }
    };

    const register = async (userData) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, userData.Email, userData.password);
            setUser(userCredential.user);
            const { password, confirmPassword, ...userDetails } = userData;
            const ID = userCredential.user.uid;
            const userDetailsForBackend = { ...userDetails, ID };
            await registerOnBackend(userDetailsForBackend);
            await login(userData.Email, userData.password);
        } catch (error) {
            console.error('Error al registrar usuario:', error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout, register, getToken: () => Cookies.get('token') }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
