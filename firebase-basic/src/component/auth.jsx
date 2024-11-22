import { useState } from 'react';
import {auth, googleProvider} from  '../config/firebase';
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'

export const Auth = () => {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth,email,password)
        }catch(err){
            console.log(err);
        }
    }

    console.log(auth?.currentUser?.email);

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth,googleProvider)
        }catch(err){
            console.log(err);
        }
    }

    const logOut = async () => {
        try{
            await signOut(auth)
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signIn}>Sign in</button>


            <button onClick={signInWithGoogle}>Signin with google</button>
            <button onClick={logOut}>logout</button>
        </div>
    )
}