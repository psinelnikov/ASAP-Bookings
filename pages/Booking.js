import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";
import { StyleSheet, Text, View, Button, Image, FlatList } from "react-native";
import { CalendarList } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Picker } from "@react-native-community/picker";

import Bookings from "../src/services/Bookings";
import AuthService from "../src/services/Auth";

export default Booking = ({ navigation }) => {
	const [date, setDate] = useState(new Date());
	//const [show, setShow] = useState(false);
	const [markedDates, setMarkedDates] = useState(
		moment(date).format("YYYY-MM-DD")
	);
	const [people, setPeople] = useState(1);

	// const setTime = (event, selectedTime) => {
	// 	if (selectedTime) {
	// 		console.log(selectedTime.toLocaleString());
	// 		setDate(selectedTime);
	// 	}

	// 	setShow(false);
	// };

	// const showTimepicker = () => {
	// 	setShow(true);
	// };

	return (
		<View style={styles.container}>
			<View style={{ flex: 6, flexDirection: "column" }}>
				<CalendarList
					futureScrollRange={3}
					showScrollIndicator={true}
					horizontal={true}
					pastScrollRange={0}
					pagingEnabled={true}
					markedDates={{ [markedDates]: { selected: true } }}
					onDayPress={(date) => {
						console.log(date);
						setDate(new Date(date.year, date.month, date.day));
						setMarkedDates(date.dateString);
					}}
				/>
			</View>
			<View style={{ flex: 1, flexDirection: "row" }}>
				<Text>Number of People</Text>
				<Picker
					selectedValue={people}
					style={{ height: 50, width: 100 }}
					onValueChange={(number, itemIndex) => {
						setPeople(number);
						console.log(people);
					}}
				>
					<Picker.Item label="1" value="1" />
					<Picker.Item label="2" value="2" />
					<Picker.Item label="3" value="3" />
					<Picker.Item label="4" value="4" />
					<Picker.Item label="5" value="5" />
					<Picker.Item label="6" value="6" />
					<Picker.Item label="7" value="7" />
					<Picker.Item label="8+" value="8" />
				</Picker>
			</View>
			<View style={{}}>
				{/* <Button onPress={showTimepicker} title="Book Time" />
					{show && (
						<DateTimePicker
							mode="time"
							value={date}
							onChange={setTime}
							minuteInterval={10}
							display="spinner"
						/>
					)} */}
				<Button
					title="View Available Times"
					onPress={() => navigation.navigate("Times")}
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
	fixToText: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
