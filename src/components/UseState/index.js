import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseState() {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (!!loading) {
      // La doble negación nos permite validar si la variable es diferente de undefined y si es verdadero.
      setError(false);
      setTimeout(() => {
        if (value !== SECURITY_CODE) {
          setError(true);
          setValue('');
        }
        setLoading(false);
      }, 3000);
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
        <input
          placeholder='Código de seguridad'
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
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