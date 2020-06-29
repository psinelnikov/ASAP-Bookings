import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

import AuthService from "../src/services/Auth";
import Bookings from "../src/services/Bookings";

import { userContext } from "../src/userContext";

export default function Home() {
	// const avatar = user.photoURL && (
	// 	<Image style={{ width: 50, height: 50 }} source={{ uri: user.photoURL }} />
	// );
	//console.log(userContext._currentValue);
	const userData = userContext._currentValue;

	handleAddBooking = () => {
		// start 1 hour later, lasting 1 hour
		const startDate =  new Date(new Date().getTime() + 60 * 60000);
		const endDate =  new Date(startDate.getTime() + 60 * 60000);
		const guestCount = 8;
		Bookings.addBooking(startDate, endDate, guestCount);
	}

	handleViewBooking = () => {
		Bookings.viewBookings();
	}

	return (
		<View style={styles.container}>
			{/* <Text>Home!!!!</Text> */}
			<Text>Welcome {userData.displayName}</Text>
			<Text>You are logged in!</Text>
			{/* {avatar} */}
			<Button onPress={handleAddBooking} title="Add Booking" />
			<Button onPress={handleViewBooking} title="View Bookings" />
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
