import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CalendarList } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment-round";
import { Picker } from "@react-native-community/picker";

import Bookings from "../src/services/Bookings";
import AuthService from "../src/services/Auth";

export default function BookingDetails({ navigation, route }) {
	const { id } = route.params;

	return (
		<View style={styles.container}>
			<Text>Date</Text>
			<Text>Time</Text>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate("Booking", { id })}
			>
				<Text>Rebook</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={async () => {
					await Bookings.cancelBooking(id);
					navigation.navigate("ViewBookings");
				}}
			>
				<Text>Cancel</Text>
			</TouchableOpacity>
			<Text>Guests</Text>
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
