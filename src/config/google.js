import getEnvVars from "../../environment";
const { ANDROID_CLIENT_ID } = getEnvVars();

const google = Object.freeze({
	androidClientId: ANDROID_CLIENT_ID,
});

export default google;
