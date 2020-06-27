import getEnvVars from "../../environment";
const {
	FIREBASE_API_KEY,
	FIREBASE_AUTH_DOMAIN,
	FIREBASE_DATABASE_URL,
	FIREBASE_STORAGE_BUCKET,
} = getEnvVars();

const firebase = Object.freeze({
	apiKey: FIREBASE_API_KEY,
	authDomain: FIREBASE_AUTH_DOMAIN,
	databaseURL: FIREBASE_DATABASE_URL,
	storageBucket: FIREBASE_STORAGE_BUCKET,
});

export default firebase;
