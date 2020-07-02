import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";
import { StyleSheet, Text, View, Button, Image, FlatList, Alert } from "react-native";
import { CalendarList } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment-round";
import { Picker } from "@react-native-community/picker";

import Bookings from "../src/services/Bookings";
import AuthService from "../src/services/Auth";

export default Booking = ({ route, navigation }) => {
	const { date, people, id, today } = route.params;
	const [blockedTime, setBlockedTime] = useState([]);
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		if (moment(date).isSameOrAfter(today, "day")) {
			let startDate;
			if (moment(date).hour() < 8) {
				startDate = moment(date).set({ hour: 8, minute: 0, second: 0 });
			} else {
				startDate = moment(date).ceil(20, "minutes");
			}

			let endDate = moment(startDate).hours(16).minutes(59);
			let difference = moment(endDate).diff(startDate);
			let minutes = difference / 1000 / 60; // 1 minute interval
			let interval = people > 2 ? 60 : 30; // minutes
			let id = 0;
			let tempBooks = [];

			// Calculates the frontend values for booking times
			for (let i = minutes; i > 0; i -= interval) {
				// if () {
				endDate = moment(startDate).add(interval, "m").toDate();
				tempBooks.push({
					key: ++id,
					guests: people,
					startDate: startDate,
					endDate: endDate,
				});

				startDate = endDate;
			}
			// get blocked times, then add { blocked: true } to each booking, if blocked
			Bookings.getBlockedTimes(tempBooks).then(blockedTimes => {
				setBookings(blockedTimes);
			});
		}
	}, []);

	const keyExtractor = (item, index) => index.toString();

	const renderItem = ({ item }) => (
		<ListItem
			titleStyle={item.blocked ? styles.blocked : null}
			title={`${moment(item.startDate).format("h:mm")} - ${moment(
				item.endDate
			).format("h:mm")}`}
			onPress={async () => {
				if (id) {
					const updated = await Bookings.updateBooking(id, {
						startDate: item.startDate,
						endDate: item.endDate,
						guests: item.guests,
					});
					if (updated) {
						console.log(`Successfully updated ID: ${id}!`);
						const { guests } = item;
						const startDate = item.startDate.valueOf() / 1000;
						const endDate = item.endDate.valueOf() / 1000;
						navigation.navigate("BookingDetails", { id, startDate, endDate, guests });
						return;
					}
					console.log("Rebook Unsuccessful!");
				} else {
					try {
						const startDate = item.startDate.toDate()
						const endDate = item.startDate.toDate()
						const created = await Bookings.addBooking(
							startDate,
							endDate,
							item.guests
						);
						if (created) {
							Alert.alert("Successfully Added a Booking", `Starting at ${item.startDate} for ${item.guests} guests!`);
							console.log(`Booking Successful for ID: ${created}!`);
						}
					} catch (err) {
						Alert.alert("Unable to Add Booking", err);
					}
				}
			}}
			bottomDivider
			chevron
		/>
	);

	return (
		<View style={styles.container}>
			{bookings.length > 0 ? (
				<FlatList
					keyExtractor={keyExtractor}
					data={bookings}
					renderItem={renderItem}
				/>
			) : (
				<Text style={{ alignSelf: "center" }}>
					Sorry, there are no available bookings for this day
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	blocked: {
		textDecorationLine: 'line-through',
		color: 'rgba(0, 0, 0, 0.25)'
	},
});