"use client"
import auth from "@/lib/Firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext(null);


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const provider = new GoogleAuthProvider();


    const userRegistrationSystem = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userLoginSystem = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    const googleAuthSystem = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }


    const logoutSystem = () => {
        return signOut(auth);
    }



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log(currentUser);
            setLoading(false);
        })
        return () => unSubscribe();
    }, [])



    const userInfo = {
        user,
        loading,
        setLoading,
        userRegistrationSystem,
        userLoginSystem,
        googleAuthSystem,
        logoutSystem
    }

    return <authContext.Provider value={userInfo} >{children}</authContext.Provider>
}


export default AuthProvider