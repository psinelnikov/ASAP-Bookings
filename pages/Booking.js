import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Button,
	Image,
	FlatList,
	Alert,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { CalendarList } from "react-native-calendars";
import moment from "moment";

import Bookings from "../src/services/Bookings";
import AuthService from "../src/services/Auth";
import PhoneService from "../src/services/Phone";


export default function Booking({ navigation, route }) {
	const { id, startDate, guests } = route.params;
	const [date, setDate] = useState(moment(startDate) || new Date());
	const [markedDates, setMarkedDates] = useState(
		moment(date).format("YYYY-MM-DD")
	);
	const [people, setPeople] = useState(guests || 1);
	const today = new Date();

	function handleViewAvailableTimes() {
		const dateVal = date.toISOString();
		const todayVal = today.toISOString();

		if (!dateVal) {
			Alert.alert('Hello!', 'Please select a day to book your reservation.');
			return;
		}

		navigation.navigate("Times", { dateVal, people, id, todayVal })
	}

	// useEffect(() => {
	// 	navigation.addListener("focus", () => {
	// 		// redirect to phone screen if no phone # is saved
	// 		PhoneService.userHasPhoneNo()
	// 		.then((result) => {
	// 			if (!result) navigation.navigate("Phone");
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// 	})
	// }, []);

	return (
		<View style={styles.container}>
			<View style={{ flex: 5, flexDirection: "column" }}>
				<CalendarList
					futureScrollRange={3}
					showScrollIndicator={true}
					horizontal={true}
					pastScrollRange={0}
					pagingEnabled={true}
					markedDates={{
						[markedDates]: { selected: true, selectedColor: "#aaa" },
					}}
					onDayPress={(date) => {
						if (moment(today).date() !== date.day) {
							setDate(
								new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0)
							);
						} else {
							setDate(today);
						}
						setMarkedDates(date.dateString);
					}}
				/>
			</View>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text>Number of People: </Text>
				<Picker
					selectedValue={people}
					style={{ width: 140 }}
					onValueChange={(itemValue, itemIndex) => setPeople(itemValue)}
				>
					<Picker.Item label="1 Person" value={1} />
					<Picker.Item label="2 People" value={2} />
					<Picker.Item label="3 People" value={3} />
					<Picker.Item label="4 People" value={4} />
					<Picker.Item label="5 People" value={5} />
					<Picker.Item label="6 People" value={6} />
				</Picker>
			</View>
			<View style={{ flex: 1 }}>
				<TouchableOpacity
					style={styles.button}
					onPress={handleViewAvailableTimes}
				>
					<Text>View Available Times</Text>
				</TouchableOpacity>
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
	fixToText: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	button: {
		alignItems: "center",
		backgroundColor: "#DDDDDD",
		padding: 10,
		marginBottom: 20,
	},
});
