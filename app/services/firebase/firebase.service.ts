import { firebase } from '@nativescript/firebase';

export async function initializeFirebase() {
  try {
    await firebase.init({
      // Firebase config will go here
      persist: true,
    });
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}