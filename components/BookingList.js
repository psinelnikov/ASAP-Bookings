// import React, { useState } from "react";
// import { StyleSheet, Text, View, Button, Image } from "react-native";
// import { CalendarList } from "react-native-calendars";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import moment from "moment";

// import AuthService from "../src/services/Auth";

// export default BookingList = () => {
// 	const [date, setDate] = useState(new Date());
// 	const [show, setShow] = useState(false);
// 	const [markedDates, setMarkedDates] = useState(
// 		moment(date).format("YYYY-MM-DD")
// 	);
// 	// const avatar = user.photoURL && (
// 	// 	<Image style={{ width: 50, height: 50 }} source={{ uri: user.photoURL }} />
// 	// );

// 	const setTime = (event, selectedTime) => {
// 		console.log(selectedTime.toLocaleString());
// 		//new Date(date.getFullYear(), date.getMonth(), date.getDay(), hours, minutes, 0, 0)
// 		//setDate(selectedTime);
// 		setShow(false);
// 		//console.log(selectedTime);
// 		//console.log(date);
// 	};

// 	const showTimepicker = () => {
// 		setShow(true);
// 	};
// 	return (
// 		<View style={styles.container}>
// 			<View style={{ flex: 4, flexDirection: "column" }}>
// 				<CalendarList
// 					futureScrollRange={3}
// 					showScrollIndicator={true}
// 					horizontal={true}
// 					pastScrollRange={0}
// 					pagingEnabled={true}
// 					markedDates={{ [markedDates]: { selected: true } }}
// 					onDayPress={(date) => {
// 						console.log(date);
// 						setDate(new Date(date.year, date.month, date.day));
// 						setMarkedDates(date.dateString);
// 					}}
// 				/>
// 			</View>
// 			<View style={{ flex: 2, flexDirection: "column" }}>
// 				<Button onPress={showTimepicker} title="Show time picker!" />
// 				{show && (
// 					<DateTimePicker
// 						mode="time"
// 						value={date}
// 						onChange={setTime}
// 						minuteInterval={30}
// 					/>
// 				)}
// 			</View>

// 			{/* {avatar} */}
// 			{/* <Button onPress={AuthService.logout} title="Logout" /> */}
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// });

// <FlatList
//         style={[styles.container]}
//         data={colors}
//         renderItem={({ item }) => {
//           return (
//             <ColorButton
//               key={item.id}
//               backgroundColor={item.color}
//               onPress={() =>
//                 navigation.navigate("Details", {
//                   color: item.color
//                 })
//               }
//             />
