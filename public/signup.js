// import { ref, set,database } from "./config.js";
// import { createUserWithEmailAndPassword } from "./config.js";
// import { getAuth } from "./config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getDatabase,ref,set,push,onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhHUQpCM0S8uceoc1hzS1AQkebxp1ql7E",
  authDomain: "quiz-database-d4ee0.firebaseapp.com",
  projectId: "quiz-database-d4ee0",
  storageBucket: "quiz-database-d4ee0.appspot.com",
  messagingSenderId: "1043518986510",
  appId: "1:1043518986510:web:57b4979763cb5a6a221f5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

function register() {
  var UserName = document.getElementById("UserName").value;
  var email = document.getElementById("email_id").value;
  var Password = document.getElementById("Password").value;

  var userdata = {
    UserName: UserName,
    email: email,
    Password: Password,
  };

  createUserWithEmailAndPassword(auth, email, Password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // Store user data in the Realtime Database
      var idRef = push(ref(database, "quiz/"));
      var id = idRef.key;
      set(ref(database, `quiz/${id}`), userdata)
        .then(() => {
          alert("Account create successfully!");
        })
        .catch((error) => {
          alert("Error storing data:", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Authentication error:", errorMessage);
    });

  console.log("done");
}

var btn = document.getElementById("btn");
btn.addEventListener("click", register);

