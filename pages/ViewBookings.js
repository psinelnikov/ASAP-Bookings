import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import moment from "moment";

import Bookings from "../src/services/Bookings";

function Item({ data }) {
	const startDate = moment(data.startDate.seconds * 1000);
	const endDate = moment(data.endDate.seconds * 1000);
	const header = startDate.format('dddd, MMMM Do YYYY');
	const subheader = startDate.format('hh:mm A') + ' - ' + endDate.format('hh:mm A');

	return (
		<View style={styles.item}>
			<Text>{header}</Text>
			<Text>{subheader}</Text>
			<Text>Guests: {data.guests}</Text>
		</View>
	)
}

export default function ViewBookings({ route, navigation }) {
	const [bookings, setBookings] = useState([]);
	//const { startDate, endDate, guestCount } = route.params;
	//	if(startDate) console.log(startDate);

	useEffect(() => {
		if (route.params?.startDate) {
			const bookingData = {
				startDate: { seconds: route.params.startDate },
				endDate: { seconds: route.params.endDate },
				guests: route.params.guestCount,
				id: route.params.id,
			}
			setBookings(bookings => [...bookings, bookingData]);
			//console.log(route.params);
		}
	}, [route.params?.startDate])

  useEffect(() => {
		Bookings.viewBookings()
		.then(data => {
			setBookings(data);
		})
		.catch(err => {
			console.log(err);
		});
  }, []);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Bookings</Text>
			{bookings.length <= 0 ? <Text>You have no bookings. Make one!</Text> : null}
			<FlatList 
				data={bookings}
				renderItem={({ item }) => <Item data={item} /> }
				keyExtractor={item => item.id}
			/>
			<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddBookings")}>
				<Text>Add Booking</Text>
			</TouchableOpacity>
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
	header: {
		fontSize: 20,
		marginTop: 10,
		marginBottom: 10,
	},
	item: {
		marginBottom: 10
	},
	button: {
    backgroundColor: "#DDDDDD",
		padding: 10,
		marginBottom: 10,
	}
});
