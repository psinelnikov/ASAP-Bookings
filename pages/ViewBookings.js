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

export default function ViewBookings({ route, navigation }) {
	const [bookings, setBookings] = useState([]);

	const keyExtractor = (item, index) => index.toString();

	useEffect(() => {
		const fetchBookings = async () => {
			const data = await Bookings.viewBookings();
			setBookings(data);
		};
		fetchBookings();
	}, []);

	const renderItem = ({ item }) => (
		<ListItem
			title={`${moment(item.startDate.toDate()).format("h:mm")} - ${moment(
				item.endDate.toDate()
			).format("h:mm")}`}
			onPress={async () => {
				//console.log(item.id);
				await Bookings.cancelBooking(item.id);
				setBookings(await Bookings.viewBookings());
			}}
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
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
