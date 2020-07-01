import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, FlatList } from "react-native";
import { CalendarList } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Picker } from "@react-native-community/picker";

import AuthService from "../src/services/Auth";
//import bookings from "../data/bookings.json";
import PhoneService from "../src/services/Phone";

export default Booking = ({ navigation }) => {
	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);
	const [markedDates, setMarkedDates] = useState(
		moment(date).format("YYYY-MM-DD")
	);
	const [people, setPeople] = useState(1);
	// const avatar = user.photoURL && (
	// 	<Image style={{ width: 50, height: 50 }} source={{ uri: user.photoURL }} />
	// );

	const setTime = (event, selectedTime) => {
		//console.log(selectedTime.toLocaleString());
		//new Date(date.getFullYear(), date.getMonth(), date.getDay(), hours, minutes, 0, 0)
		//setDate(selectedTime);
		setShow(false);
		//console.log(selectedTime);
		//console.log(date);
	};

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

	const showTimepicker = () => {
		setShow(true);
	};
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
						//console.log(people);
					}}
				>
					<Picker.Item label="1" value="1" />
					<Picker.Item label="2" value="2" />
				</Picker>
			</View>
			<View style={{ flex: 2, flexDirection: "column" }}>
				<Button onPress={showTimepicker} title="Show time picker!" />
				{show && (
					<DateTimePicker
						mode="time"
						value={date}
						onChange={setTime}
						minuteInterval={30}
					/>
				)}
			</View>
			<View style={{ flex: 1, flexDirection: "row" }}>
				{/* <FlatList
					data={bookings}
					renderItem={({ item }) => {
						return <Text>{item.availableTime}</Text>;
					}}
				/> */}
			</View>

			{/* {avatar} */}
			{/* <Button onPress={AuthService.logout} title="Logout" /> */}
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
