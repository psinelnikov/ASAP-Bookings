import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

import { config } from "../config";
import { Firebase, Database } from "../integrations/firebase";

export default class AuthService {
	/**
	 * Login with Facebook and Firebase
	 *
	 * Uses Expo Facebook API and authenticates the Facebook user in Firebase
	 */
	static async loginWithFacebook() {
		try {
			await Facebook.initializeAsync(config.facebook.appId);
			const { type, token } = await Facebook.logInWithReadPermissionsAsync(
				config.facebook.appId,
				{
					permissions: ["public_profile"],
				}
			);

			if (type === "success" && token) {
				// Build Firebase credential with the Facebook access token.
				const credential = Firebase.auth.FacebookAuthProvider.credential(token);

				// Sign in with credential from the Facebook user.
				const user = await Firebase.auth().signInWithCredential(credential);
				const docRef = await Database.collection("users")
					.doc(Firebase.auth().currentUser.uid)
					.get();
				if (docRef.exists) {
					// user already exists
				} else {
					AuthService.addUserToDatabase(user);
				}
			}
		} catch (err) {
			console.error(err);
		}
	}

	static async loginWithGoogle() {
		try {
			const { type, idToken, accessToken } = await Google.logInAsync({
				androidClientId: config.google.androidClientId,
				androidStandaloneAppClientId: config.google.androidClientId,
			});

			if (type === "success") {
				// Build Firebase credential with the Google access token.
				const credential = Firebase.auth.GoogleAuthProvider.credential(
					idToken,
					accessToken
				);

				// Sign in with credential from the Google user.
				const user = await Firebase.auth().signInWithCredential(credential);
				const docRef = await Database.collection("users")
					.doc(Firebase.auth().currentUser.uid)
					.get();
				if (docRef.exists) {
					// user already exists
				} else {
					AuthService.addUserToDatabase(user);
				}
			} else {
				console.error("failed to login with google");
			}
		} catch (err) {
			console.error(err);
		}
	}

	static addUserToDatabase(user) {
		const { profile } = user.additionalUserInfo;
		Database.collection("users")
			.doc(Firebase.auth().currentUser.uid)
			.set({
				email: profile.email,
				firstName: profile.given_name || profile.first_name,
				lastName: profile.family_name || profile.last_name,
				created: new Date(),
			});
	}

	static subscribeAuthChange(callback) {
		Firebase.auth().onAuthStateChanged(callback);
	}

	static async logout() {
		return Firebase.auth().signOut();
	}
}
