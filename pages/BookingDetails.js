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
	const { id, startDate, endDate, guests } = route.params;

	return (
		<View style={styles.container}>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "column",
						alignItems: "flex-end",
						margin: 10,
					}}
				>
					<Text>Time of Booking:</Text>
					<Text>Date of Booking:</Text>
					<Text>Number of People:</Text>
				</View>

				<View
					style={{
						flex: 1,
						flexDirection: "column",
						alignItems: "flex-start",
						margin: 10,
					}}
				>
					<Text style={{ fontWeight: "bold" }}>
						{moment(startDate.toDate()).format("dddd, LL")}
					</Text>
					<Text style={{ fontWeight: "bold" }}>
						{moment(startDate.toDate()).format("LT")}
					</Text>
					<Text style={{ fontWeight: "bold" }}>{guests}</Text>
				</View>
			</View>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-around",
				}}
			>
				<TouchableOpacity
					style={styles.button}
					onPress={() =>
						navigation.navigate("Booking", { id, startDate, guests })
					}
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
					<Text>Cancel Booking</Text>
				</TouchableOpacity>
			</View>
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
		alignItems: "center",
		backgroundColor: "#DDDDDD",
		width: 120,
		padding: 10,
		marginBottom: 50,
	},
});
