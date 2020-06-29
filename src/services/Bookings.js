import { Firebase, Database } from "../integrations/firebase";

// Auth().getCurrentUser() - instead

export default class Bookings {

  static addBooking(startDate, endDate, numOfGuests) {
    // Search for all bookings, check to see if the startDate is valid
    const uid = Firebase.auth().currentUser.uid;
    // Add to database
    Database.collection("bookings").add({
      owner: uid,
      startDate: startDate,
      endDate: endDate,
      guests: numOfGuests,
      created: new Date(),
    })
    .then(docRef => {
      console.log(docRef.id);
      return docRef.id;
    })
    .catch(err => {
      console.log(err);
    });
  }

  static viewBookings() {
    //
    const uid = Firebase.auth().currentUser.uid;
    // Query database
    Database.collection("bookings").where("owner", "==", uid)
    .get()
    .then(querySnapshot => {
      let bookings = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        bookings.push({
          id: doc.id,
          created: data.created,
          date: data.date,
          guests: data.guests,
          owner: data.owner,
        });
      });
      console.log(bookings);
      return bookings;
    })
    .catch(err => {
      console.log(err);
    });
  }

}