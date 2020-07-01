import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import AuthService from "../src/services/Auth";

export default Login = () => {
	//state = { user: null };

	// componentDidMount() {
	// 	AuthService.subscribeAuthChange((user) => this.setState({ user }));
	// }

	// 	const { user } = this.state;

	// 	if (user) {
	// 		const avatar = user.photoURL && (
	// 			<Image
	// 				style={{ width: 50, height: 50 }}
	// 				source={{ uri: user.photoURL }}
	// 			/>
	// 		);

	// 		return (
	// 			<View style={styles.container}>
	// 				<Text>You are logged in!</Text>
	// 				{avatar}
	// 				<Button onPress={AuthService.logout} title="Logout" />
	// 			</View>
	// 		);
	// 	}

	return (
		<>
			<View style={{ flex: 1, justifyContent: "center" }}>
				<Text
					style={{
						fontSize: 80,
						textAlign: "center",
					}}
				>
					ASAP Bookings
				</Text>
			</View>
			<View style={styles.container}>
				<Icon.Button
					style={{ height: 50 }}
					name="facebook"
					backgroundColor="#3b5998"
					onPress={AuthService.loginWithFacebook}
				>
					Login with Facebook
				</Icon.Button>
				{/* <Button
					onPress={AuthService.loginWithFacebook}
					title="Login with Facebook"
				/> */}
				<Icon.Button
					style={{ height: 50 }}
					name="google"
					backgroundColor="#DB4437"
					onPress={AuthService.loginWithGoogle}
				>
					Login with Google
				</Icon.Button>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "stretch",
		justifyContent: "center",
	},
});
