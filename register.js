import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa_XuCld_iNtP2lH8vkn1hcRDr3bwBXRc",
  authDomain: "webcomicnovel.firebaseapp.com",
  databaseURL: "https://webcomicnovel-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "webcomicnovel",
  storageBucket: "webcomicnovel.appspot.com",
  messagingSenderId: "840417395448",
  appId: "1:840417395448:web:830fb48f47a3bba684b10d",
  measurementId: "G-0YS5XKQDSV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const regUsername = document.getElementById('regUsername').value;
    const regEmail = document.getElementById('regEmail').value;
    const regPassword = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (regPassword !== confirmPassword) {
        alert('Konfirmasi password tidak cocok.');
        return;
    }

    createUserWithEmailAndPassword(auth, regEmail, regPassword)
        .then((userCredential) => {
            const userRolesRef = doc(firestore, 'userRoles', userCredential.user.uid);
            setDoc(userRolesRef, { role: 'user' });

            alert('Registrasi berhasil. Silakan login.');
            // Redirect ke halaman login setelah registrasi berhasil
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Registration error:', error.message);
            alert('Registrasi gagal. Periksa kembali data yang dimasukkan.');
        });
});
