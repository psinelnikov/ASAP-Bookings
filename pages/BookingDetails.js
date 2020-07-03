import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ToastAndroid,
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

export default function BookingDetails({ navigation, route }) {
	const { id, startDate, endDate, guests } = route.params;
	const [modalVisible, setModalVisible] = useState(true);

	const showToast = (msg) => {
		ToastAndroid.show(msg, ToastAndroid.SHORT);
	};

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
						{moment(startDate).format("dddd, LL")}
					</Text>
					<Text style={{ fontWeight: "bold" }}>
						{moment(startDate).format("LT")}
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
						navigation.navigate("Booking", {
							id,
							startDate,
							guests,
						})
					}
				>
					<Text>Reschedule</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<CustomModal
						visible={modalVisible}
						title={`${moment(startDate).format("MMMM Do")}, ${moment(
							startDate
						).format("h:mm A")} - ${moment(endDate).format("h:mm A")}`}
						message={`Do you wish to delete the booking at this time for ${guests} ${
							guests > 1 ? "People?" : "Person?"
						}`}
						onPress={async () => {
							try {
								await Bookings.cancelBooking(id);
								showToast("Booking Successfully Cancelled!");
								navigation.navigate("ViewBookingsStack", {
									screen: "ViewBookings",
									params: {
										id: id,
										endDate: endDate,
										startDate: startDate,
										guests: guests,
									},
								});
							} catch (e) {
								Alert.alert("Error", "Unable to delete booking.");
							}
						}}
					/>
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
