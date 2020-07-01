import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, FlatList } from "react-native";
import { Picker } from "@react-native-community/picker";
import { CalendarList } from "react-native-calendars";
import moment from "moment";

import Bookings from "../src/services/Bookings";
import AuthService from "../src/services/Auth";
import PhoneService from "../src/services/Phone";

export default function Booking({ navigation }) {
	const [date, setDate] = useState(new Date());
	const [markedDates, setMarkedDates] = useState(
		moment(date).format("YYYY-MM-DD")
	);
	const [people, setPeople] = useState(1);
	const today = new Date();

	useEffect(() => {
		// redirect to phone screen if no phone # is saved
		const hasPhoneNo = PhoneService.userHasPhoneNo()
		.then(result => {
			if (!result) navigation.navigate("Phone");
		})
		.catch(err => {
			console.log(err);
		});
	}, []);

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
							setDate(new Date(date.year, date.month, date.day, 0, 0, 0, 0));
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
					style={{ width: 200 }}
					onValueChange={(itemValue, itemIndex) => setPeople(itemValue)}
				>
					<Picker.Item label="1 Person" value={1} />
					<Picker.Item label="2 People" value={2} />
					<Picker.Item label="3 People" value={3} />
					<Picker.Item label="4 People" value={4} />
					<Picker.Item label="5 People" value={5} />
					<Picker.Item label="6+ People" value={6} />
				</Picker>
			</View>
			<View style={{ flex: 1 }}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Times", { date })}
				>
					<Text>View Available Times</Text>
				</TouchableOpacity>
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
