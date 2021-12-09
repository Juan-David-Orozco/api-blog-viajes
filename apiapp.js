const express = require('express')
const app = express()
const mysql = require('mysql2')
const bodyParser = require('body-parser')

var pool = mysql.createPool({
  connectionLimit : 20,
  host      : 'localhost',
  user      : 'root',
  password  : 'juan',
  database  : 'blog_viajes'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/publicaciones', function(peticion, respuesta) {
  
  pool.getConnection(function(err, connection) {
    const query = `SELECT * FROM publicaciones`
    connection.query(query, function(error, filas, campos) {
      respuesta.json({data: filas})
    })
    connection.release()
  })
  
})

app.listen(8080, function(){
  console.log("Servidor iniciado");
})