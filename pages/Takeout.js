import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default Home = () => {
	return (
		<View style={styles.container}>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "column",
						alignItems: "center",
						margin: 0,
					}}
				>
					<Text>Website:</Text>
					<Text>Phone:</Text>
				</View>

				<View
					style={{
						flex: 1,
						flexDirection: "column",
						alignItems: "flex-start",
					}}
				>
					<Text style={{ fontWeight: "bold" }}>www.asapbookings.com</Text>
					<Text style={{ fontWeight: "bold" }}>647-555-5555</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		marginBottom: 20,
	},
});
