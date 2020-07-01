import React, { useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Image,
	TouchableOpacity,
} from "react-native";

import { Firebase, Database } from "../src/integrations/firebase";
import AuthService from "../src/services/Auth";
import { userContext } from "../src/userContext";

export default function Home({ navigation }) {
	const userData = userContext._currentValue;

	const user = Firebase.auth().currentUser;
	//console.log(user);

	const avatar = user && user.photoURL && (
		<Image
			style={{ width: 48, height: 48, marginBottom: 10 }}
			source={{ uri: userData.photoURL }}
		/>
	);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate("Booking", { name: "Jane" })}
			>
				<Text>Make a Booking</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate("Takeout")}
			>
				<Text>Take Out Order</Text>
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
