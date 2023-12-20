 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
 import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyCkmwIhYwyoIT0nIJHSHkIxY8cNR3w6rRM",
   authDomain: "blog-app-02.firebaseapp.com",
   databaseURL: "https://blog-app-02-default-rtdb.firebaseio.com",
   projectId: "blog-app-02",
   storageBucket: "blog-app-02.appspot.com",
   messagingSenderId: "823597135423",
   appId: "1:823597135423:web:1a890e08af233685b66a8a",
   measurementId: "G-0J6FTYSMHZ"
 };

 // Initialize Firebase

 ////////////////// signup here ///////////////////

 const name = document.querySelector('#SignUp-name')
 const lName = document.querySelector('#SignUp-Lname')
 const email = document.querySelector('#SignUp-email').value
 const pass = document.querySelector('#SignUp-pass').value
 const signupButton = document.querySelector('#SignUp-Btn')


 const app = initializeApp(firebaseConfig);
 const database = getDatabase(app);
 const auth = getAuth();


 signupButton.addEventListener('submit', (e) => {
    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert('User Create')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
  
 })