import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseState() {
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
    delete: false,
    confirm: false
  })

  const onCorrect = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      value: '',
      confirm: true
    });
  }
  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
      value: ''
    });
  }
  const onWrite = (newValue) => {
    setState({ ...state, value: newValue });
  }
  const onCheck = () => {
    setState({
      ...state, loading: true, error: false
    });
  }
  const onConfirm = () => {
    setState({
      ...state,
      delete: true
    })
  }
  const onReset = () => {
    setState({
      ...state,
      confirm: false,
      delete: false
    })
  }

  React.useEffect(() => {
    if (!!state.loading) {
      // La doble negación nos permite validar si la variable es diferente de undefined y si es verdadero.
      setTimeout(() => {
        if (state.value === SECURITY_CODE)
          onCorrect();
        else
          onError();
      }, 3000);
    }
    console.log('termina el efect');
  }, [state.loading])

  if (!state.delete && !state.confirm)
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
            onChange={(event) => onWrite(event.target.value)}
          />
          <input
            type='submit'
            value='Comprobar'
            onClick={(e) => {
              e.preventDefault();
              onCheck();
            }}
          />
        </form>
      </div>
    );
  else if (!state.delete && !!state.confirm)
    return (
      <div>
        <h2>Eliminar UseState</h2>
        <p>¿Estás seguro que deseas eliminar UseState?</p>
        <div>
          <button
            type="button"
            onClick={onConfirm}
          >
            Por supuesto
          </button>
          <button
            type="button"
            onClick={onReset}
          >
            Cancelar
          </button>
        </div>
      </div>
    )
  else
    return (
      <div>
        <h2>Eliminar UseState</h2>
        <p>Eliminado con éxito</p>
        <button
          type='button'
          onClick={onReset}
        >
          Recuperar UseState
        </button>
      </div>
    )
}

export { UseState };