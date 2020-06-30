import { Firebase, Database } from "../integrations/firebase";
import moment from "moment";

export default class Bookings {

  static addBooking(startDate, endDate, numOfGuests) { // this can be refactored later
    const uid = Firebase.auth().currentUser.uid;
    // Query for all bookings, check start / end dates
    Database.collection("bookings").get()
    .then(querySnapshot => {
      if (Bookings.checkCollisions(querySnapshot, startDate, endDate)) {
        // There was a collision
        console.log("there was a conflict in dates");
      } else {
        // Add to database
        Database.collection("bookings").add({
          owner: uid,
          startDate: startDate,
          endDate: endDate,
          guests: numOfGuests,
          created: new Date(),
        })
        .then(docRef => {
          // return reference to document
          console.log(docRef.id);
          return docRef.id;
        })
        .catch(err => {
          console.log(err);
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  static viewBookings() {
    const uid = Firebase.auth().currentUser.uid;
    // Query for all bookings owned by current user
    Database.collection("bookings").where("owner", "==", uid).get()
    .then(querySnapshot => {
      let bookings = [];
      querySnapshot.forEach(doc => {
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
      // return array of bookings
      console.log(bookings);
      return bookings;
    })
    .catch(err => {
      console.log(err);
    });
  }

  // TO-DO
  static cancelBooking(id) {
    // check if current user owns this booking id
  }

  // TO-DO
  static updateBooking(id) {
    // check if current user owns this booking id
  }

  // Checks to see if there are any collisions with dates when making a new booking
  static checkCollisions(querySnapshot, startDate, endDate) {
    for (let doc of querySnapshot.docs) {
      const data = doc.data();
      const newDate = { start: startDate.valueOf(), end: endDate.valueOf() };
      const currDate = { start: data.startDate.seconds * 1000, end: data.endDate.seconds * 1000 };
      if (moment(newDate.start).isBetween(moment(currDate.start), moment(currDate.end)) ||
          moment(newDate.end).isBetween(moment(currDate.start), moment(currDate.end))) {
        return true;
      }
    }
    return false;
  }

}