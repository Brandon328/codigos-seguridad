import React from 'react';

function UseState() {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (!!loading) {
      // La doble negación nos permite validar si la variable es diferente de undefined y si es verdadero.
      setTimeout(() => {
        setError(true);
      }, 3000);
    }
    else {
      setError(false);
    }
    console.log('termina el efect');
  }, [loading])
  return (
    <div>
      <h2>Eliminar UseState</h2>
      <p>Por favor, escribe el código de seguridad.</p>
      {error && (<p>Error: Código de seguridad invalido</p>)}
      {(loading && !error) && (<p>Cargando...</p>)}
      <div>
        <input placeholder='Código de seguridad' />
        <input
          type='button'
          value='Comprobar'
          onClick={() => setLoading(!loading)}
        />
      </div>
    </div>
  );
}

export { UseState };