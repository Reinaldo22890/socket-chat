var socket = io();
var params = new URLSearchParams(window.location.search);

//Verificar que exista un nombre en los parametros
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

//Creando un objeto con el nombre
var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

//escuchar la conexion con el servidor
socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(res) {
        console.log('Usuarios conectados:', res);
    });
});

// escuchar desconexiones del servidor
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


// // Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Reinaldo',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información del "crearMensaje" que viene del servidor
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//escuchar cambios de usuarios (Cuando un usuario entra o sale del chat)
socket.on('listaPersonas', function(personas) {
    console.log(personas);
});

//mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado: ', mensaje);
});