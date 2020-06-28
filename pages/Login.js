import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

import AuthService from "../src/services/Auth";

export default class Login extends React.Component {
	//state = { user: null };

	// componentDidMount() {
	// 	AuthService.subscribeAuthChange((user) => this.setState({ user }));
	// }

	render() {
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
			<View style={styles.container}>
				<Text>Welcome!</Text>
				<Button
					onPress={AuthService.loginWithFacebook}
					title="Login with Facebook"
				/>
				<Button
					onPress={AuthService.loginWithGoogle}
					title="Login with Google"
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
