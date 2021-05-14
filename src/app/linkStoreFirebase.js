import { linkStoreWithPath, linkStoreWithDb } from 'firebase-redux';
import {firebase} from initFirebase.js;

const db = firebase.database();

const usersPath = '/users'

const usersActionCreator = (user) => {
  
}

const pushRegisterUserInfo = (state) => {
  const userKey = db.ref(usersPath).push().key;
}

