import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";
import { StyleSheet, Text, View, Button, Image, FlatList } from "react-native";
import { CalendarList } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Picker } from "@react-native-community/picker";

import Bookings from "../src/services/Bookings";
import AuthService from "../src/services/Auth";

export default Booking = () => {
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		var startDate = new Date();
		let endDate = new Date().setHours(30);
		let minutes = (endDate - startDate) / 1000 / 60; // 1 minute interval
		console.log(minutes);
		let interval = 20; // minutes
		let id = 0;

		for (i = minutes; i > 0; i -= interval) {
			endDate = moment(startDate).add(interval, "m").toDate();
			bookings.push({
				key: ++id,
				owner: "me",
				startDate: startDate,
				endDate: endDate,
			});

			startDate = endDate;
		}

		console.log(bookings);
	}, []);

	const keyExtractor = (item, index) => index.toString();

	const renderItem = ({ item }) => (
		<ListItem
			title={item.owner}
			subtitle={item.startDate.toLocaleString()}
			badge={{
				value: 3,
				textStyle: { color: "orange" },
				containerStyle: { marginTop: -20 },
			}}
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
