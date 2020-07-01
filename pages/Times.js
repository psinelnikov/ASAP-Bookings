import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";
import { StyleSheet, Text, View, Button, Image, FlatList } from "react-native";
import { CalendarList } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment-round";
import { Picker } from "@react-native-community/picker";

import Bookings from "../src/services/Bookings";
import AuthService from "../src/services/Auth";

export default Booking = ({ route }) => {
	const { date } = route.params;
	const [bookings, setBookings] = useState([]);

	// bookTime = () => {};

	useEffect(() => {
		let startDate;
		if (moment(date).hour() < 8) {
			startDate = moment(date).set({ hour: 8, minute: 0, second: 0 });
		} else {
			startDate = moment(date).ceil(20, "minutes");
		}

		let endDate = moment(startDate).hours(16).minutes(59);
		let difference = moment(endDate).diff(startDate);
		let minutes = difference / 1000 / 60; // 1 minute interval
		let interval = 20; // minutes
		let id = 0;

		// Calculates the frontend values for booking times
		for (let i = minutes; i > 0; i -= interval) {
			endDate = moment(startDate).add(interval, "m").toDate();
			bookings.push({
				key: ++id,
				owner: "me",
				startDate: startDate,
				endDate: endDate,
			});

			startDate = endDate;
		}
	}, []);

	const keyExtractor = (item, index) => index.toString();

	const renderItem = ({ item }) => (
		<ListItem
			title={moment(item.startDate).format("h:mm")}
			onPress={() => console.log("TODO")}
			bottomDivider
			chevron
		/>
	);

	return (
		<View style={styles.container}>
			<View style={{ flex: 1, flexDirection: "row" }}>
				<FlatList
					keyExtractor={keyExtractor}
					data={bookings}
					renderItem={renderItem}
				/>
			</View>
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