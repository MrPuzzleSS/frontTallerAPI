const url = 'https://backendtallerapi.onrender.com/api/servicio'
const listarDatos = async () => {
  let respuesta = ''
  let body = document.getElementById('contenido')
  //url: Es la url de la api.
  //Al deslpegarla en el servidor colocar la api del servidor
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function (data) {
      let listaServicios = data.servicios //Capturar el array devuelto por la api
      datos =
        listaServicios.map(function (servicios) {//Recorrer el array
          respuesta += `<tr><td>${servicios.servicio}</td>` +
            `<td>${servicios.valor}</td>` +
            `<td>${servicios.fechaRegistro}</td>` +
            `<td><a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='editar(${JSON.stringify(servicios)})' >Editar</a> 
            <a class="btn btn-danger" onclick='eliminar(${JSON.stringify(servicios)})'>Eliminar</a></td>` +
            `</tr>`
          body.innerHTML = respuesta
        })
    })
}

function fecha () {
    let fechaHoyInput = document.getElementById("fecha");
    let fechaHoy = new Date().toISOString().split("T")[0];
    fechaHoyInput.value = fechaHoy;
  };

const editar = (servicios) => {
  let fechaHoy = new Date().toISOString().split("T")[0];
  

    document.getElementById('servicioM').value = ''
    document.getElementById('valorM').value = ''
    document.getElementById('fechaM').value = ''

  
    document.getElementById('servicioM').value = servicios.servicio
    document.getElementById('valorM').value = servicios.valor
    document.getElementById('fechaM').value = fechaHoy
  
  }


  const eliminar = (servicio) =>{
    const url = 'https://backendtallerapi.onrender.com/api/servicio';

    Swal.fire({
        title: 'Estas seguro?',
        text: "Se eliminara completamente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
            let servicios = {
                servicio: servicio.servicio}
      
            fetch(url,  {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(servicios),//Convertir el objeto _usuario  a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
            .then(json => {
                Swal.fire(json.msg,
                    'Eliminado!',
                    'El servicio se elimino correctamente.',
                    'success'
                  )
            })
        }
      })
  
  }
  
  const registrar = async () => {
    let _servicio = document.getElementById('servicio').value 
    let _valor = document.getElementById('valor').value 
    const url = 'https://backendtallerapi.onrender.com/api/servicio';
  
      let servicio = {
        servicio: _servicio,
        valor: _valor,
      }
  
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(servicio),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });
      if ((_servicio !== '') && (_valor !== '')){
        if (response.ok) {
          const data = await response.json();
          // Mostrar mensaje de éxito
          Swal.fire(data.msg, 'El servicio se registro correctamente!', 'success');
  
        } else {
          // Mostrar mensaje de error
          Swal.fire('Hubo un error en el registro.', 'Haz clic en el botón!', 'error');
        }
      }else{
        if (_servicio === ''){
          document.getElementById("mensajeServicio").innerHTML = '<div class="alert alert-danger" role="alert">El nombre del servicio es obligatorio</div>';
        }else{
          document.getElementById("mensajeServicio").innerHTML = '';
        }

        if (_valor === ''){
          document.getElementById("mensajeValor").innerHTML = '<div class="alert alert-danger" role="alert">El valor es obligatorio obligatorio</div>';
        }else{
          document.getElementById("mensajeValor").innerHTML = '';
        }
      }
      }
      // Verificar el estado de la respuesta
      
  
  const actualizar = async () => {
    let _servicio = document.getElementById('servicioM').value 
    let _valor = document.getElementById('valorM').value 
    const url = 'https://backendtallerapi.onrender.com/api/servicio';
  
    let servicio = {
        servicio:_servicio,
        valor:_valor
      }
  
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(servicio),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });
      if ((_servicio !== '') && (_valor !== '')){
        if (response.ok) {
          const data = await response.json();
          // Mostrar mensaje de éxito
          Swal.fire(data.msg, 'El servicio se registro correctamente!', 'success');
          
        } else {
          // Mostrar mensaje de error
          Swal.fire('Hubo un error en el registro.', 'Haz clic en el botón!', 'error');
        }
      }else{
        if (_servicio === ''){
          document.getElementById("mensajeServicio").innerHTML = '<div class="alert alert-danger" role="alert">Ingrese el documento es obligatorio</div>';
        }else{
          document.getElementById("mensajeServicio").innerHTML = '';
        }

        if (_valor === ''){
          document.getElementById("mensajeValor").innerHTML = '<div class="alert alert-danger" role="alert">Ingrese el nombre obligatorio</div>';
        }else{
          document.getElementById("mensajeValor").innerHTML = '';
        }
      }
    } 
  
  if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#btnRegistrar')
      .addEventListener("click", () => { registrar(), listarDatos() })
  }
  
  if (document.querySelector('#btnActualizar')) {
    document.querySelector('#btnActualizar')
      .addEventListener("click", () => { actualizar(), listarDatos() })
  }
