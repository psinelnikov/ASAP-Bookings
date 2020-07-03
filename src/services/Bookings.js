import { Firebase, Database } from "../integrations/firebase";
import moment from "moment";

import PushNotification from "./PushNotification";

export default class Bookings {
	static addBooking(startDate, endDate, numOfGuests) {
		return new Promise((resolve, reject) => {
			const uid = Firebase.auth().currentUser.uid;
			// Query for all bookings, check start and end dates
			Database.collection("bookings")
				.get()
				.then((querySnapshot) => {
					if (Bookings.checkCollisions(querySnapshot, startDate, endDate)) {
						// There was a collision
						reject("Please try another date. This date is unavailable.");
					} else {
						const notificationTime = startDate - 30 * 60000; // 30 minutes before start
						PushNotification.scheduleBookingNotification(notificationTime).then(
							(notificationId) => {
								// Add to database
								Database.collection("bookings")
									.add({
										owner: uid,
										startDate: startDate,
										endDate: endDate,
										guests: numOfGuests,
										created: new Date(),
										notification: notificationId,
									})
									.then((docRef) => {
										resolve(docRef.id);
									})
									.catch((err) => {
										reject(err);
									});
							}
						);
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	static getBlockedTimes(dates) {
		return new Promise((resolve, reject) => {
			Database.collection("bookings")
				.get()
				.then((querySnapshot) => {
					for (let i = 0; i < dates.length; i++) {
						if (
							Bookings.checkCollisions(
								querySnapshot,
								dates[i].startDate,
								dates[i].endDate
							)
						) {
							dates[i].blocked = true;
						}
					}
					//console.log(dates);
					resolve(dates);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	static viewBookings() {
		return new Promise((resolve, reject) => {
			const uid = Firebase.auth().currentUser.uid;
			// Query for all bookings owned by current user
			Database.collection("bookings")
				.where("owner", "==", uid)
				.get()
				.then((querySnapshot) => {
					let bookings = [];
					querySnapshot.forEach((doc) => {
						const data = doc.data();
						bookings.push({
							id: doc.id,
							owner: data.owner,
							guests: data.guests,
							startDate: data.startDate,
							endDate: data.endDate,
							created: data.created,
						});
					});
					resolve(bookings);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	static cancelBooking(id) {
		return new Promise((resolve, reject) => {
			const bookingRef = Database.collection("bookings").doc(id);
			bookingRef
				.get()
				.then((doc) => {
					const notificationId = doc.data().notification;
					bookingRef.delete().then(() => {
						PushNotification.cancelBookingNotification(notificationId).then(
							() => {
								resolve("Done");
							}
						);
					});
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	static updateBooking(id, data) {
		// pass an object for data e.g. { guests: 2 }
		return new Promise((resolve, reject) => {
			const bookingRef = Database.collection("bookings").doc(id);
			bookingRef
				.get()
				.then((doc) => {
					const notificationId = doc.data().notification;
					PushNotification.cancelBookingNotification(notificationId).then(
						() => {
							const notificationTime =
								(data.startDate || doc.data().startDate) - 30 * 60000; // 30 minutes before start
							PushNotification.scheduleBookingNotification(
								notificationTime
							).then((notificationId) => {
								data.notification = notificationId;
								bookingRef.update(data).then(() => {
									resolve("Done");
								});
							});
						}
					);
				})
				.catch((err) => {
					console.log(err);
					reject(err);
				});
		});
	}

	// Checks to see if there are any collisions with dates when making a new booking
	static checkCollisions(querySnapshot, startDate, endDate) {
		for (let doc of querySnapshot.docs) {
			const data = doc.data();
			const newDate = { start: startDate.valueOf(), end: endDate.valueOf() };
			const currDate = {
				start: data.startDate.seconds * 1000,
				end: data.endDate.seconds * 1000,
			};
			if (
				moment(newDate.start + 60000).isBetween(
					moment(currDate.start),
					moment(currDate.end)
				) ||
				moment(newDate.end - 60000).isBetween(
					moment(currDate.start),
					moment(currDate.end)
				)
			) {
				return true;
			}
		}
		return false;
	}
}
