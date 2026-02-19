import { app, db } from "./firebase.js";

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const auth = getAuth(app);

window.login = async function() {

  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  const msg = document.getElementById("msg");

  msg.innerText = "Cargando...";

  try {

    // ✅ Login Firebase
    const userCred = await signInWithEmailAndPassword(auth, email, pass);

    const uid = userCred.user.uid;

    // ✅ Buscar rol en Firestore
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      msg.innerText = "⚠️ Usuario sin rol asignado.";
      return;
    }

    const role = snap.data().role;

    msg.innerText = "✅ Entrando como " + role;

    // ✅ Redirección automática
    if (role === "admin") {
      window.location.href = "admin.html";
    }

    if (role === "waiter") {
      window.location.href = "waiter.html";
    }

    if (role === "kitchen") {
      window.location.href = "kitchen.html";
    }

  } catch (err) {
    msg.innerText = "❌ Error: " + err.message;
  }
};