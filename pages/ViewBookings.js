import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";
import { StyleSheet, View, FlatList } from "react-native";
import moment from "moment";
import "moment-round";

import Bookings from "../src/services/Bookings";

export default function ViewBookings({ route, navigation }) {
	const [bookings, setBookings] = useState([]);

	const keyExtractor = (item, index) => index.toString();

	useEffect(() => {
		const fetchBookings = async () => {
			const data = await Bookings.viewBookings();
			setBookings(data);
		};
		fetchBookings();
	}, []);

	useEffect(() => {
		if (route.params) {
			Bookings.viewBookings().then((data) => setBookings(data));
		}
	}, [route.params]);

	function viewDetails(item) {
		navigation.navigate("BookingDetails", {
			id: item.id,
			startDate: item.startDate.seconds * 1000,
			endDate: item.endDate.seconds * 1000,
			guests: item.guests,
		});
	}

	const renderItem = ({ item }) => (
		<ListItem
			title={`${moment(item.startDate.toDate()).calendar()} - ${moment(
				item.startDate.toDate()
			).fromNow()}`}
			subtitle={
				item.guests > 1 ? `${item.guests} People` : `${item.guests} Person`
			}
			onPress={() => viewDetails(item)}
			bottomDivider
			chevron
		/>
	);

	return (
		<View style={styles.container}>
			<FlatList
				keyExtractor={keyExtractor}
				data={bookings}
				renderItem={renderItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "flex-start",
		flexDirection: "row",
	},
});
