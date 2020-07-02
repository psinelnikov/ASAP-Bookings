import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Image,
	FlatList,
	RefreshControl,
} from "react-native";
import { CalendarList } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment-round";
import { Picker } from "@react-native-community/picker";

import Bookings from "../src/services/Bookings";
import AuthService from "../src/services/Auth";

export default function ViewBookings({ route, navigation }) {
	const [refreshing, setRefreshing] = React.useState(false);
	const [bookings, setBookings] = useState([]);

	const keyExtractor = (item, index) => index.toString();

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		setBookings(await Bookings.viewBookings());
		setRefreshing(false);
	}, [refreshing]);

	useEffect(() => {
		const fetchBookings = async () => {
			const data = await Bookings.viewBookings();
			setBookings(data);
		};
		fetchBookings();
	}, []);

	useEffect(() => {
		if (route.params) {
			Bookings.viewBookings()
			.then(data => setBookings(data));
		}
	}, [route.params]);

	function viewDetails(item) {
		navigation.navigate("BookingDetails", {
			id: item.id,
			startDate: item.startDate.seconds * 1000,
			endDate: item.endDate.seconds * 1000,
			guests: item.guests,
		});
		// navigation.navigate("BookingDetails", {
		// 	id: item.id,
		// 	startDate: item.startDate.toDate(),
		// 	endDate: item.endDate,
		// 	guests: item.guests,
		// })
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
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
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
		justifyContent: "center",
		flexDirection: "row",
	},
});
