import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { Firebase } from "../src/integrations/firebase";
import AuthService from "../src/services/Auth";
import { userContext } from "../src/userContext";

export default function Home({ navigation }) {
	const userData = userContext._currentValue;

	const user = Firebase.auth().currentUser;

	const avatar = user && user.photoURL && (
		<Image
			style={{ width: 48, height: 48, marginBottom: 10 }}
			source={{ uri: userData.photoURL }}
		/>
	);

	return (
		<View style={styles.container}>
			{avatar}
			<Text style={styles.header}>Welcome {user && user.displayName}!</Text>
			<TouchableOpacity style={styles.button} onPress={AuthService.logout}>
				<Text>Logout</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		marginBottom: 20,
	},
	button: {
		alignItems: "center",
		backgroundColor: "#DDDDDD",
		padding: 10,
		marginBottom: 20,
	},
});
