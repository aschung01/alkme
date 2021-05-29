import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from './firebaseConfig.js';

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const auth = firebase.auth();
export const emailCredential = (email, password) => firebase.auth.EmailAuthProvider.credential(email, password);