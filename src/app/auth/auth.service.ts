import { auth } from 'firebase';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.error(error)
      );
  }

  signinUser(email: string, password: string) {
    auth().signInWithEmailAndPassword(email, password)
      .then(
        (response) => {
          auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
          this.router.navigate(['/']);
        }
      ).catch(
        error => console.error(error)
    );
  }

  getToken() {
    auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logoutUser() {
    auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
  }
}
