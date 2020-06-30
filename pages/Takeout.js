import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export default Home = () => {
	return (
		<View style={styles.container}>
			<Text>Take Out!</Text>
			<Text>Website</Text>
			<Text>Phone</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
