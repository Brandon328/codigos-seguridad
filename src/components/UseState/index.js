import React from 'react';

function UseState() {
  const [error, setError] = React.useState(false);
  return (
    <div>
      <h2>Eliminar UseState</h2>
      <p>Por favor, escribe el código de seguridad.</p>
      {error && (<p>Error: Código de seguridad invalido</p>)}
      <div>
        <input placeholder='Código de seguridad' />
        <input
          type='button'
          value='Comprobar'
          onClick={() => setError(!error)}
        />
      </div>
    </div>
  );
}

export { UseState };