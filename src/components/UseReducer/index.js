import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onCorrect = () => dispatch({ type: actionTypes.correct })
  const onError = () => dispatch({ type: actionTypes.error })
  const onWrite = (event) => dispatch({ type: actionTypes.write, payload: event.target.value })
  const onCheck = () => dispatch({ type: actionTypes.check })
  const onConfirm = () => dispatch({ type: actionTypes.confirm })
  const onReset = () => dispatch({ type: actionTypes.reset })

  React.useEffect(() => {
    if (!!state.loading) {
      // La doble negación nos permite validar si la variable es diferente de undefined y si es verdadero.
      console.log(state.value);
      setTimeout(() => {
        if (state.value === SECURITY_CODE)
          onCorrect();
        else
          onError();
      }, 1500);
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
            onChange={onWrite}
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
        <h2>Eliminar {name}</h2>
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
      </div >
    )
  else
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Eliminado con éxito</p>
        <button
          type='button'
          onClick={onReset}
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

const actionTypes = {
  correct: 'CORRECT',
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  confirm: 'CONFIRM',
  reset: 'RESET'
}

const reducerObject = (state, payload) => ({
  [actionTypes.correct]: {
    ...state,
    error: false,
    loading: false,
    value: '',
    confirm: true
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
    value: ''
  },
  [actionTypes.write]: {
    ...state,
    value: payload
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
    error: false
  },
  [actionTypes.confirm]: {
    ...state,
    delete: true
  },
  [actionTypes.reset]: {
    ...state,
    confirm: false,
    delete: false
  }
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type])
    return reducerObject(state, action.payload)[action.type];
  else
    return state;
}

export { UseReducer };