import { useState, useEffect } from 'react';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

export default function useAuth(initial = {}) {
  const [auth, setAuth] = useState(initial);

  useEffect(() => {
    firebase.auth().onIdTokenChanged(user => {
      if (user) {
        authHandler({user});
      }
    });
  }, []);

  const authHandler = async (authData) => {
    const owner = await base.fetch('owner', {context: this});

    setAuth({
      ...auth,
      uid: authData.user.uid,
      owner: owner || authData.user.uid,
    });
  };

  const authenticate = () => {
    const authProvider = new firebase.auth['GithubAuthProvider']();

    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(authHandler);
  };

  const logout = async () => {
    await firebase.auth().signOut();
    setAuth({
      ...auth,
      uid: null,
    });
  };

  return {
    auth,
    authenticate,
    logout,
  }
}