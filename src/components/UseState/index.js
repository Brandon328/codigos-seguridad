import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseState() {
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false
  })

  React.useEffect(() => {
    if (!!state.loading) {
      // La doble negación nos permite validar si la variable es diferente de undefined y si es verdadero.
      setTimeout(() => {
        if (state.value === SECURITY_CODE)
          setState({
            ...state,
            error: false,
            loading: false
          })

        else
          setState({
            ...state,
            error: true,
            loading: false,
            value: ''
          })
      }, 3000);
    }
    console.log('termina el efect');
  }, [state.loading])
  return (
    <div>
      <h2>Eliminar UseState</h2>
      <p>Por favor, escribe el código de seguridad.</p>
      {state.error && (<p>Error: Código de seguridad invalido</p>)}
      {(state.loading && !state.error) && (<p>Cargando...</p>)}
      <form>
        <input
          placeholder='Código de seguridad'
          value={state.value}
          onChange={(event) => setState({ ...state, value: event.target.value })}
        />
        <input
          type='submit'
          value='Comprobar'
          onClick={(e) => {
            e.preventDefault();
            setState({
              ...state, loading: true, error: false
            });
          }}
        />
      </form>
    </div>
  );
}

export { UseState };