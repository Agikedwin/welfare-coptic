// src/services/userService.js
import {db} from '../firebase'
import { signOut } from "firebase/auth";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  addDoc

} from "firebase/firestore";

import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import User from "../models/UserModel";

const usersCollection = collection(db, "users");
const arrearsCollection = collection(db, "users_arrears");
const auth = getAuth();

// Check if user exists in Firestore by UID
export const findUserByUID = async (uid) => {
  const q = query(usersCollection, where("uid", "==", uid));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];
  }
  return null;
};

// Create user in Firestore
export const createUser = async (user) => {
  const docRef = await addDoc(usersCollection, {
    uid: user.uid,
    phone_number: user.phone_number,
    email: user.email,
    full_name: user.full_name,
    user_role: user.user_role,
    createdAt: user.createdAt,
  });
  return docRef;
};

// Sign in and conditionally create user
export const signInAndInitializeUser = async (email, password) => {
  try {
    console.log("AT SIG UP ::::",email,password)
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    /* 
    const firebaseUser = userCredential.user;

    console.log('FIRESTORE ---- ',firebaseUser)

    const existingUser = await findUserByUID(firebaseUser.uid);
    if (existingUser) {
      console.log("User already exists in Firestore:", existingUser);
      return existingUser;
    }

    // If not found, create in Firestore
    const newUser = {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName || "Unnamed User",
      email: firebaseUser.email,
     
      createdAt: new Date(),
    };

    await createUser(newUser);
    console.log("New user created in Firestore:", newUser);
    return newUser; */

    return userCredential

  } catch (error) {
    console.error("Authentication or Firestore error:", error);
    //throw error;
    return {'error': true}
  }
};


export const signUpCreateUserWithEmailAndPassword = async (email, password,full_name,phone_number,) => {
  try {
    console.log("AT SIG UP ::::",email,password)
    const userCredential = await createUserWithEmailAndPassword(auth, email, email);
    const firebaseUser = userCredential.user;

    console.log('FIRESTORE ---- ',firebaseUser)

    const existingUser = await findUserByUID(firebaseUser.uid);
    if (existingUser) {
      console.log("User already exists in Firestore:", existingUser);
      return existingUser;
    }

    // If not found, create in Firestore
    const newUser = {
      uid: firebaseUser.uid,
      full_name: full_name,
      email: firebaseUser.email,
      phone_number: phone_number,
      user_role: 'Member',
      createdAt: new Date(),
    };

    await createUser(newUser);
    console.log("New user created in Firestore:", newUser);
    return newUser;

  } catch (error) {
    console.error("Authentication or Firestore error:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const snapshot = await getDocs(usersCollection);
    const users = snapshot.docs.map((doc) => {
      const data = doc.data();
      console.log(data)
      return data//new User(data.uid, data.full_name,data.phone_number,data.email);
    });
     console.log(users)
    
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateUser = async (docId, updates) => {
  console.log("See update object", updates)
  try {
    const q = query(usersCollection, where("uid", "==", docId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // ✅ User found
      const docRef = snapshot.docs[0].ref;
      const existingData = snapshot.docs[0].data();

      const mergedUpdate = {
        ...updates,
        updatedAt: new Date(), // auto-add update timestamp
        // Example of appending values with union
        
        phone_number: updates.phone_number,
        date_joined: updates.date_joined,


        tags: updates.tags
          ? arrayUnion(...updates.tags)
          : existingData.tags || [],
      };

      await updateDoc(docRef, mergedUpdate);
      console.log("User updated:", docRef.id);
      return docRef.id;
    } else {
      console.log('The user not found')
    }
  } catch (error) {
    console.error("Error updating/creating user:", error);
    throw error;
  }
};

export const saveUserArrears = async (data) => {
  const docRef = await addDoc(arrearsCollection, data);
  return docRef;
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};