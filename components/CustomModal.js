import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";

export default CustomModal = ({
	visible,
	title,
	message,
	onPress = (f) => f,
}) => {
	const [modalVisible, setModalVisible] = useState(true);

	useEffect(() => {
		setModalVisible(!modalVisible);
	}, [visible]);

	return (
		<View style={styles.container}>
			<Modal
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {}}
			>
				<View style={styles.modal}>
					<View>
						<View style={styles.modalContainer}>
							<View style={styles.modalHeader}>
								<Text style={styles.title}>{title}</Text>
								<View style={styles.divider}></View>
							</View>
							<View style={styles.modalBody}>
								<Text style={styles.bodyText}>{message}</Text>
							</View>
							<View style={styles.modalFooter}>
								<View style={styles.divider}></View>
								<View style={{ flexDirection: "row-reverse", margin: 10 }}>
									<TouchableOpacity
										style={{ ...styles.actions, backgroundColor: "#db2828" }}
										onPress={() => {
											setModalVisible(!modalVisible);
										}}
									>
										<Text style={styles.actionText}>No</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={{ ...styles.actions, backgroundColor: "#21ba45" }}
									>
										<Text style={styles.actionText} onPress={() => onPress()}>
											Yes
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
				</View>
			</Modal>
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
	modal: {
		backgroundColor: "#00000099",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	modalContainer: {
		backgroundColor: "#f9fafb",
		width: "80%",
		borderRadius: 5,
	},
	modalHeader: {},
	title: {
		fontWeight: "bold",
		fontSize: 15,
		padding: 15,
		color: "#000",
	},
	divider: {
		width: "100%",
		height: 1,
		backgroundColor: "lightgray",
	},
	modalBody: {
		backgroundColor: "#fff",
		paddingVertical: 20,
		paddingHorizontal: 10,
	},
	modalFooter: {},
	actions: {
		borderRadius: 5,
		marginHorizontal: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	actionText: {
		color: "#fff",
	},
});
