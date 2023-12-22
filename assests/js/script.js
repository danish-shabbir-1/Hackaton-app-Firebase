import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkmwIhYwyoIT0nIJHSHkIxY8cNR3w6rRM",
  authDomain: "blog-app-02.firebaseapp.com",
  databaseURL: "https://blog-app-02-default-rtdb.firebaseio.com",
  projectId: "blog-app-02",
  storageBucket: "blog-app-02.appspot.com",
  messagingSenderId: "823597135423",
  appId: "1:823597135423:web:1a890e08af233685b66a8a",
  measurementId: "G-0J6FTYSMHZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let uid;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    if (!window.location.href.includes("dashboard")) {
      window.location.href = "dashboard.html";
      window.location = "dashboard.html";
    }
    console.log("user login");
    uid = user.uid;

    let ref = doc(db,'userInfo', uid)
    let userInfoData = await getDoc(ref)
    console.log(userInfoData.data()) 
    // ... 
  } else {
    console.log("user not login");
  }
});

const logoutBtn = document.getElementById("logout-Btn");

logoutBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      alert("user logOut");
      window.location = "login.html";
    })
    .catch((error) => {
      alert(error);
    });
});

/////////////// create user /////////////////
const email = document.getElementById("SignUp-email");
const userName = document.getElementById("SignUp-name");
const pass = document.getElementById("SignUp-pass");
const SignUpButton = document.getElementById("SignUp-FORM");

SignUpButton?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  createUserWithEmailAndPassword(auth, email.value, pass.value)
    .then(async (userCredential) => {
      let user = userCredential.user;

      const userInfo = {
        Name: userName.value,
        Email: email.value,
        Pass: pass.value,
      };

      await setDoc(doc(db,'userInfo', uid),userInfo)

      console.log(userInfo)

      alert("user create");
      window.location = "login.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
});

///////////////// Login user ////////////////////////////

const Loginemail = document.getElementById("Login-email");
const loginPass = document.getElementById("login-Pass");
const loginButton = document.getElementById("login-Form");

loginButton?.addEventListener("submit", (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, Loginemail.value, loginPass.value)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("user login");
      window.location = "login.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
