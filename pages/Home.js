import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

import AuthService from "../src/services/Auth";

export default function Home({ navigation }) {
	// const avatar = user.photoURL && (
	// 	<Image style={{ width: 50, height: 50 }} source={{ uri: user.photoURL }} />
	// );
	return (
		<View style={styles.container}>
			<View>
				<Text>Home!!!!</Text>
			</View>

			<Text>You are logged in!</Text>
			<Button
				title="Make a Booking"
				onPress={() => navigation.navigate("Booking", { name: "Jane" })}
			/>
			<Button
				title="Take Out Order"
				onPress={() => navigation.navigate("Takeout")}
			/>

			{/* {avatar} */}
			<Button onPress={AuthService.logout} title="Logout" />
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
});
