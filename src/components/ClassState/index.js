import React from 'react';

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }
  render() {
    return (
      <div>
        <h2>Eliminar ClassState</h2>
        <p>Por favor, escribe el código de seguridad.</p>
        {this.state.error && (<p>Error: Código de seguridad invalido</p>)}
        <div>
          <input placeholder='Código de seguridad' />
          <input
            type='button'
            value='Comprobar'
            onClick={() => {
              this.setState(prevState => ({
                error: !prevState.error
              }))
            }}
          />
        </div>
      </div>
    );
  }
}

export { ClassState };