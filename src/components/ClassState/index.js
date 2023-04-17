import React from 'react';

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false
    };
  }
  componentDidUpdate() {
    if (!!this.state.loading) {
      // La doble negación nos permite validar si la variable es diferente de undefined y si es verdadero.
      setTimeout(() => {
        this.setState({ error: true, loading: false });
      }, 3000);
    }
    console.log('termina el efect');
  }
  render() {
    return (
      <div>
        <h2>Eliminar ClassState</h2>
        <p>Por favor, escribe el código de seguridad.</p>
        {this.state.error && (<p>Error: Código de seguridad invalido</p>)}
        {(this.state.loading && !this.state.error) && (<p>Cargando...</p>)}
        <div>
          <input placeholder='Código de seguridad' />
          <input
            type='button'
            value='Comprobar'
            onClick={() => this.setState({ loading: !this.state.loading, error: false })}
          />
        </div>
      </div>
    );
  }
}

export { ClassState };