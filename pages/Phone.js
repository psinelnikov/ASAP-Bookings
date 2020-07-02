import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	TextInput,
} from "react-native";

import PhoneService from "../src/services/Phone";

export default Phone = ({ navigation }) => {
	const [phoneNo, setPhoneNo] = useState(null);

	function savePhoneNo() {
		if (!phoneNo) return;
		PhoneService.savePhoneNo(phoneNo)
			.then(() => {
				navigation.reset({
					index: 1,
					routes: [{ name: "AddBookingsStack" }],
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<View style={styles.container}>
			<Text>Please enter your Phone Number</Text>
			<TextInput
				style={{
					height: 40,
					borderColor: "gray",
					width: 200,
					borderWidth: 1,
					marginTop: 20,
				}}
				textContentType="telephoneNumber"
				onChangeText={(text) => setPhoneNo(text)}
				value={phoneNo}
			/>
			<TouchableOpacity style={styles.button} onPress={() => savePhoneNo()}>
				<Text>Save</Text>
			</TouchableOpacity>
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
	button: {
		alignItems: "center",
		backgroundColor: "#DDDDDD",
		width: 120,
		padding: 10,
		marginTop: 30,
	},
});
