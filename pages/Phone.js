import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, TextInput } from "react-native";

import PhoneService from "../src/services/Phone";

export default Phone = ({ navigation }) => {
	const [phoneNo, setPhoneNo] = useState(null);

	function savePhoneNo() {
		if (!phoneNo) return;
		PhoneService.savePhoneNo(phoneNo)
			.then(() => {
				navigation.navigate("Booking");
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<View style={styles.container}>
			<Text>Please enter your Phone Number</Text>
			<TextInput
				style={{ height: 40, borderColor: "gray", width: 100, borderWidth: 1 }}
				onChangeText={(text) => setPhoneNo(text)}
				value={phoneNo}
			/>
			<Button title="Save" onPress={savePhoneNo} />
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
