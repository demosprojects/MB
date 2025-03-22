document.getElementById('turnoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const servicio = document.getElementById('servicio').value;
    const adminTelefono = "543598765432"; // Tu número de WhatsApp

    const mensajeCliente = encodeURIComponent(`Hola ${nombre}! Tu turno ha sido confirmado para el día ${fecha} a las ${hora}. Nos vemos pronto!`);
    const mensajeAdmin = encodeURIComponent(`Nuevo turno: Cliente ${nombre}, Tel: ${telefono}, Fecha: ${fecha} a las ${hora}, Servicio: ${servicio}.`);
    
    // Enviar mensaje al cliente
    window.open(`https://api.whatsapp.com/send?phone=${telefono}&text=${mensajeCliente}`, '_blank');
    
    // Enviar mensaje al administrador (tú)
    window.open(`https://api.whatsapp.com/send?phone=${adminTelefono}&text=${mensajeAdmin}`, '_blank');
    
    // Mostrar mensaje de confirmación
    document.getElementById('mensajeConfirmacion').style.display = 'block';
});