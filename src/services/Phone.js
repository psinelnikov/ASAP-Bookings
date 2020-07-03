import { Firebase, Database } from "../integrations/firebase";

export default class PhoneService {

  static userHasPhoneNo() {
    return new Promise((resolve, reject) => {
      const user = Firebase.auth().currentUser.uid;
      Database.collection("users").doc(user).get()
      .then(docRef => {
        const userData = docRef.data();
        //console.log(userData.phoneNo !== undefined && userData.phone !== null)
        resolve(userData.phoneNo !== undefined && userData.phone !== null); // return true if user has phoneNo
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
    });
  }

  static savePhoneNo(phoneNo) {
    return new Promise((resolve, reject) => {
      const user = Firebase.auth().currentUser.uid;
      Database.collection("users").doc(user)
      .update({
        phoneNo: phoneNo
      })
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
    });
  }

}