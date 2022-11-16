import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAV-0xlBmSVZrvhTdTcz-lKlUIaoG7456s",
  authDomain: "listatarefas-8737d.firebaseapp.com",
  projectId: "listatarefas-8737d",
  storageBucket: "listatarefas-8737d.appspot.com",
  messagingSenderId: "451372728772",
  appId: "1:451372728772:web:e2d63c8fe6cb1044142491"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db } 