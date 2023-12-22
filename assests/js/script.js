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
  getDocs,
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
let idUserName;
let userNameForAdd  = document.getElementById("userName")


/////////////// on auth stage change ///////////////////

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("user login");
    uid = user.uid;

    let ref = doc(db,'userInfo', uid)
    let userInfoData = await getDoc(ref)
    idUserName = userInfoData.data().name
    userNameForAdd.innerText = idUserName
    getAllData()
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


      await setDoc(doc(db, 'userInfo', uid), {
        name:userName.value,
        userEmail:  email.value,
          Pass: pass.value,
    })

      alert("user create");
            window.location.href = "dashboard.html";

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
});

///////////////// Login user /////////////////

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
      window.location = "dashboard.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

///////////////// Add docc  /////////////////

const blogTitle = document.getElementById("blog-title");
const blogDetail = document.getElementById("blog-detail");
const blogForm = document.getElementById("blog-form");
const BlogContent = document.getElementById("Blog-Content");


blogForm.addEventListener('submit', async (e) => {
  e.preventDefault()


  const docRef = await addDoc(collection(db, "BlogsInfo"), {
    title: blogTitle.value,
    detail: blogDetail.value,
    uid: uid
  });
  alert('blog was publish')
  getAllData()
  console.log("Document written with ID: ", docRef.id);
})


async function getAllData()  {
  const querySnapshot = await getDocs(collection(db, "BlogsInfo"));
  querySnapshot.forEach(async(Blog) => {

    let dashBlogInfo = Blog.data()

    console.log(dashBlogInfo);

    let blogff = BlogContent.innerHTML += `
    <div>
     <h3>${idUserName}</h3>
     <h4>${blogTitle.value}</h4>
     <h6>${blogDetail.value}</h6>
     <button> Delete </button>
     <button> Edit </button>
    </div>`;

    blogff.appendChild(BlogContent)

    
  });
}