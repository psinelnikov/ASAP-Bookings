import * as firebase from "firebase";
import "firebase/firestore";

import { config } from "../config";

firebase.initializeApp(config.firebase);

export const Firebase = firebase;
export const Database = firebase.firestore();