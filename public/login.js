
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
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


function login() {
  var email = document.getElementById("email_id").value;
  var Password = document.getElementById("Password").value;

  signInWithEmailAndPassword(auth, email, Password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      // ...
      alert("Login successful");
      window.location.href = "./quiz1.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle login error
      alert("Login failed: " + errorMessage);
    });
}


var loginbtn = document.getElementById("loginbtn");
loginbtn.addEventListener("click", login);
