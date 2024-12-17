import { Observable } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-auth';

export class AuthService extends Observable {
  private static instance: AuthService;
  private currentUser: any = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async signIn(email: string, password: string): Promise<any> {
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      this.currentUser = user;
      return user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}