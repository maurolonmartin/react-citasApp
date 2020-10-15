import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // Citas en LocalStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de citas
  const [ citas, guardarCitas ] = useState(citasIniciales);

  // UseEfect para realizar ciertas operaciones cuando el state cambie
  useEffect( () => {
    localStorage.setItem( 'citas', JSON.stringify( citas ) );
  }, [citas] );

  // Funcion para guardar cada cita
  const crearCita = cita => {
    guardarCitas([ ...citas, cita ]);
  }

  //funcion para eliminar cita por id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter( cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  // Mensaje variable del titulo
  const titulo = citas.length === 0 ? "Agrega una cita" : "Administra tus citas";

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita =>(
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
