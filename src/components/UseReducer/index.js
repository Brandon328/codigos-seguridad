import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    if (!!state.loading) {
      // La doble negación nos permite validar si la variable es diferente de undefined y si es verdadero.
      setTimeout(() => {
        if (state.value === SECURITY_CODE)
          dispatch({
            type: 'CORRECT'
          });
        else
          dispatch({
            type: 'ERROR'
          })
      }, 3000);
    }
  }, [state.loading])

  if (!state.delete && !state.confirm)
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>
        {state.error && (<p>Error: Código de seguridad invalido</p>)}
        {(state.loading && !state.error) && (<p>Cargando...</p>)}
        <form>
          <input
            placeholder='Código de seguridad'
            value={state.value}
            onChange={(event) => dispatch({ type: 'WRITE', payload: event.target.value })}
          />
          <input
            type='submit'
            value='Comprobar'
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: 'CHECK' });
            }}
          />
        </form>
      </div>
    );
  else if (!state.delete && !!state.confirm)
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>¿Estás seguro que deseas eliminar UseState?</p>
        <div>
          <button
            type="button"
            onClick={() => dispatch({ type: 'CONFIRM' })}
          >
            Por supuesto
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: 'RESET' })}
          >
            Cancelar
          </button>
        </div>
      </div >
    )
  else
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Eliminado con éxito</p>
        <button
          type='button'
          onClick={() => dispatch({ type: 'RESET' })}
        >
          Recuperar {name}
        </button>
      </div>
    )
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  delete: false,
  confirm: false
};

const reducerObject = (state, payload) => ({
  'CORRECT': {
    ...state,
    error: false,
    loading: false,
    value: '',
    confirm: true
  },
  'ERROR': {
    ...state,
    error: true,
    loading: false,
    value: ''
  },
  'WRITE': {
    ...state,
    value: payload
  },
  'CHECK': {
    ...state,
    loading: true,
    error: false
  },
  'CONFIRM': {
    ...state,
    delete: true
  },
  'RESET': {
    ...state,
    confirm: false,
    delete: false
  }
});

const reducer = (state, action) => {
  if (reducerObject(initialState)[action.type])
    return reducerObject(initialState, action.payload)[action.type];
  else
    return state;
}

export { UseReducer };