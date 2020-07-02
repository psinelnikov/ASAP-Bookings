import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import {
	StyleSheet,
	Text,
	View,
	ToastAndroid,
	RefreshControl,
	Image,
	FlatList,
	Alert,
} from "react-native";
import { CalendarList } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment-round";
import { Picker } from "@react-native-community/picker";

import Bookings from "../src/services/Bookings";
import CustomModal from "../components/CustomModal";
import AuthService from "../src/services/Auth";

export default Booking = ({ route, navigation }) => {
	const { dateVal, people, id, todayVal } = route.params;
	const [modalVisible, setModalVisible] = useState(false);
	const [bookings, setBookings] = useState([]);
	const [localStartDate, setLocalStartDate] = useState(new Date());
	const [localEndDate, setLocalEndDate] = useState(new Date());
	const [localGuests, setLocalGuests] = useState(1);
	const [isLoading, setLoading] = useState(true);

	const showToast = (msg) => {
		ToastAndroid.show(msg, ToastAndroid.SHORT);
	};

	const refresh = async () => {
		setLoading(true);
		if (moment(dateVal).isSameOrAfter(todayVal, "day")) {
			let startDate;
			if (moment(dateVal).hour() < 8) {
				startDate = moment(dateVal)
					.set({ hour: 8, minute: 0, second: 0 })
					.toDate();
			} else {
				startDate = moment(dateVal).ceil(30, "minutes").toDate();
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
			Bookings.getBlockedTimes(tempBooks)
				.then((blockedTimes) => {
					setBookings(blockedTimes);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setLoading(false);
		}
	};

	useEffect(() => {
		async function fetchData() {
			await fetchData();
		}

		refresh();
	}, []);

	const keyExtractor = (item, index) => index.toString();

	const renderItem = ({ item }) => (
		<ListItem
			titleStyle={item.blocked ? styles.blocked : null}
			title={`${moment(item.startDate).format("h:mm A")} - ${moment(
				item.endDate
			).format("h:mm A")}`}
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
								showToast("Booking Successfully Updated!");
								refresh();
								navigation.reset({
									index: 2,
									routes: [{ name: "ViewBookingsStack" }],
								});
								return;
							}
							showToast("An Error Occurred with Updating Booking");
						} else {
							const startDate = localStartDate;
							const endDate = localEndDate;
							const created = await Bookings.addBooking(
								startDate,
								endDate,
								localGuests
							);
							if (created) {
								showToast("Booking Successfully Created!");
								refresh();
								navigation.reset({
									index: 2,
									routes: [{ name: "ViewBookingsStack" }],
								});
								return;
							}
							showToast("An Error Occurred While Creating a Booking!");
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
						{isLoading
							? "Loading available times.."
							: "Sorry, there are no available bookings for this day"}
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
		alignItems: "flex-start",
		justifyContent: "center",
		flexDirection: "row",
	},
	blocked: {
		textDecorationLine: "line-through",
		color: "rgba(0, 0, 0, 0.25)",
	},
});
