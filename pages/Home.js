import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import PhoneService from "../src/services/Phone";

export default function Home({ navigation }) {
	function handleNavigateToBooking() {
		PhoneService.userHasPhoneNo()
			.then((result) => {
				if (result) {
					navigation.navigate("Booking", {
						id: null,
						startDate: null,
						guests: null,
					});
				} else {
					navigation.navigate("Phone");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={{ ...styles.button, marginBottom: 2 }}
				onPress={handleNavigateToBooking}
			>
				<FontAwesome5 style={{ fontSize: 150 }} name={"chair"} solid />
				<Text>Reservation</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate("Takeout")}
			>
				<FontAwesome5 style={{ fontSize: 150 }} name={"walking"} solid />
				<Text>Take Out</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		marginBottom: 20,
	},
	button: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: "#DDDDDD",
		margin: 10,
	},
});
