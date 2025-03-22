import { db, auth, collection, onSnapshot, signOut, onAuthStateChanged } from "./firebase-config.js";

const turnosTabla = document.getElementById("turnosTabla");

// Verificar si el usuario está autenticado
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html"; // Redirigir si no está logueado
  }
});

// Escuchar cambios en la base de datos y mostrar turnos
onSnapshot(collection(db, "turnos"), (snapshot) => {
  turnosTabla.innerHTML = ""; // Limpiar tabla antes de actualizar

  console.log("Datos de Firestore:", snapshot.docs.map(doc => doc.data()));

  snapshot.docs.forEach((doc) => {
    const turno = doc.data();
    turnosTabla.innerHTML += `
      <tr data-id="${doc.id}">
        <td>${turno.nombre}</td>
        <td>${turno.email}</td>
        <td>${turno.telefono}</td>
        <td>${turno.fecha}</td>
        <td>${turno.hora}</td>
        <td>${turno.profesional}</td>
        <td>${turno.servicio}</td>
      </tr>
    `;
  });
});

// Cerrar sesión
document.getElementById("logout").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    console.error("Error al cerrar sesión:", error);
  });
});