import { 
  db, 
  auth, 
  collection, 
  onSnapshot, 
  signOut, 
  onAuthStateChanged, 
  deleteDoc, 
  doc, 
  updateDoc, 
  addDoc 
} from "./firebase-config.js";

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
      <td>
        <select class="form-select estado" data-id="${doc.id}">
          <option value="pendiente" ${turno.estado === "pendiente" ? "selected" : ""}>Pendiente</option>
          <option value="realizado" ${turno.estado === "realizado" ? "selected" : ""}>Realizado</option>
        </select>
      </td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="eliminarTurno('${doc.id}')">Eliminar</button>
      </td>
    </tr>
  `;
});

// Agregar evento para cambiar el estado
document.querySelectorAll(".estado").forEach((select) => {
  select.addEventListener("change", async (e) => {
    const id = e.target.getAttribute("data-id");
    const estado = e.target.value;
    try {
      await updateDoc(doc(db, "turnos", id), { estado });
      alert("Estado actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      alert("Hubo un error al actualizar el estado.");
    }
  });
});
});

// Función para eliminar un turno
window.eliminarTurno = async (id) => {
if (confirm("¿Estás seguro de que deseas eliminar este turno?")) {
  try {
    await deleteDoc(doc(db, "turnos", id));
    alert("Turno eliminado correctamente.");
  } catch (error) {
    console.error("Error al eliminar el turno:", error);
    alert("Hubo un error al eliminar el turno.");
  }
}
};

// Agregar nuevo turno
document.getElementById("addReservationForm").addEventListener("submit", async (e) => {
e.preventDefault();

const nuevoTurno = {
  nombre: document.getElementById("nombre").value,
  email: document.getElementById("email").value,
  telefono: document.getElementById("telefono").value,
  fecha: document.getElementById("fecha").value,
  hora: document.getElementById("hora").value,
  profesional: document.getElementById("profesional").value,
  servicio: document.getElementById("servicio").value,
  estado: "pendiente", // Estado inicial
  timestamp: new Date().toISOString(), // Agregar timestamp
};

try {
  await addDoc(collection(db, "turnos"), nuevoTurno);
  alert("Turno agregado correctamente.");
  document.getElementById("addReservationForm").reset(); // Limpiar el formulario
  bootstrap.Modal.getInstance(document.getElementById("addReservationModal")).hide(); // Cerrar el modal
} catch (error) {
  console.error("Error al agregar el turno:", error);
  alert("Hubo un error al agregar el turno.");
}
});

// Cerrar sesión
document.getElementById("logout").addEventListener("click", () => {
signOut(auth).then(() => {
  window.location.href = "login.html";
}).catch((error) => {
  console.error("Error al cerrar sesión:", error);
});
});
