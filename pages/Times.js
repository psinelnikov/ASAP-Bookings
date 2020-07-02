import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";
import { StyleSheet, Text, View, Button, Image, FlatList } from "react-native";
import { CalendarList } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment-round";
import { Picker } from "@react-native-community/picker";

import Bookings from "../src/services/Bookings";
import CustomModal from "../components/CustomModal";
import AuthService from "../src/services/Auth";

export default Booking = ({ route, navigation }) => {
	const { date, people, id, today } = route.params;
	const [blockedTime, setBlockedTime] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [bookings, setBookings] = useState([]);
	const [localStartDate, setLocalStartDate] = useState(new Date());
	const [localEndDate, setLocalEndDate] = useState(new Date());
	const [localGuests, setLocalGuests] = useState(1);

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
			setBookings(tempBooks);

			//}
		}
	}, []);

	const keyExtractor = (item, index) => index.toString();

	const renderItem = ({ item }) => (
		<ListItem
			title={`${moment(item.startDate).format("h:mm")} - ${moment(
				item.endDate
			).format("h:mm")}`}
			onPress={() => {
				setLocalStartDate(item.startDate);
				setLocalEndDate(item.endDate);
				setLocalGuests(item.guests);
				setModalVisible(!modalVisible);
			}}
			bottomDivider
			chevron
		/>
	);

	return (
		<>
			<View>
				<CustomModal
					visible={modalVisible}
					title="Hello!"
					message="Do you want to create a booking?"
					onPress={async () => {
						if (id) {
							const updated = await Bookings.updateBooking(id, {
								startDate: localStartDate,
								endDate: localEndDate,
								guests: localGuests,
							});
							if (updated) {
								console.log(`Successfully updated ID: ${id}!`);
								navigation.navigate("BookingDetails", {
									id,
									endDate: localEndDate,
									startDate: localStartDate,
									guests: localGuests,
								});
								return;
							}
							console.log("Rebook Unsuccessful!");
						} else {
							const created = await Bookings.addBooking(
								localStartDate,
								localEndDate,
								localGuests
							);
							if (created) {
								console.log(`Booking Successful for ID: ${created}!`);
								// navigation.navigate("ViewBookings", {
								// 	screen: "BookingDetails",
								// 	params: {
								// 		screen: "Sound",
								// 		params: {
								// 			screen: "Media",
								// 		},
								// 	},
								// });
								navigation.navigate("ViewBookingsStack", {
									screen: "ViewBookings",
									params: {
										screen: "BookingDetails",
										params: {
											id: created,
											endDate: localEndDate,
											startDate: localStartDate,
											guests: localGuests,
										},
									},
								});
								return;
							}
							console.log("Booking Unsuccessful!");
						}
					}}
				/>
			</View>
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
		</>
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
});
