/*
		SETUP API routes
		SETUP Databases
*/
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

import { config } from "../config";
import { Firebase } from "../integrations/firebase";

export default class AuthService {
	/**
	 * Login with Facebook and Firebase
	 *
	 * Uses Expo Facebook API and authenticates the Facebook user in Firebase
	 */
	static async loginWithFacebook() {
		await Facebook.initializeAsync(config.facebook.appId);
		const { type, token } = await Facebook.logInWithReadPermissionsAsync(
			config.facebook.appId,
			{ permissions: ["public_profile"] }
		);

		if (type === "success" && token) {
			// Build Firebase credential with the Facebook access token.
			const credential = Firebase.auth.FacebookAuthProvider.credential(token);

			// Sign in with credential from the Facebook user.
			await Firebase.auth().signInWithCredential(credential);
		}
	}

	static async loginWithGoogle() {
		try {
			const { type, idToken, accessToken, user } = await Google.logInAsync({
				androidClientId: config.google.androidClientId,
				androidStandaloneAppClientId: config.google.androidClientId,
			});
			if (type === 'success') {
				// Build Firebase credential with the Google access token.
				const credential = Firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);

				// Sign in with credential from the Google user.
				await Firebase.auth().signInWithCredential(credential);
			} else {
				console.error("failed to login with google");
			}
		} catch (err) {
			console.error(err);
		}
	}

	static subscribeAuthChange(callback) {
		Firebase.auth().onAuthStateChanged(callback);
	}

	static async logout() {
		return Firebase.auth().signOut();
	}
}
