import React from "react";
import { StyleSheet, Text, View, TouchableOpacity  } from "react-native";

import Bookings from "../src/services/Bookings";
// import PushNotification from "../src/services/PushNotification";

export default function AddBookings({ navigation }) {

  handleAddBooking = async () => {
    try {
      // start 1 hour later, lasting 1 hour
      const startDate =  new Date(new Date().getTime() + 31 * 60000);
      const endDate =  new Date(startDate.getTime() + 30 * 60000);
      const guestCount = parseInt(Math.random() * 9 + 1);
      const id = await Bookings.addBooking(startDate, endDate, guestCount);
      // PushNotification.sendPushNotification(new Date().getTime() + 1 * 60000);
      //console.log("addbooking:" + id);
      // navigate to viewbookings, passing an arg in 2nd
      navigation.navigate("ViewBookings", { startDate: startDate.getTime() / 1000, 
                                            endDate: endDate.getTime() / 1000, 
                                            guestCount: guestCount,
                                            id: id });
    } catch (err) {
      console.log(err);
    }
  }

	return (
		<View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAddBooking}>
				<Text>Confirm Booking</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ViewBookings")}>
				<Text>Go Back</Text>
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
	button: {
    backgroundColor: "#DDDDDD",
		padding: 10,
		marginBottom: 10,
	}
});
