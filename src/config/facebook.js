import getEnvVars from "../../environment";
const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = getEnvVars();

const facebook = Object.freeze({
	appId: FACEBOOK_APP_ID,
	appSecret: FACEBOOK_APP_SECRET,
});

export default facebook;
