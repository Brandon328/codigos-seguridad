import React from 'react';

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: false,
      loading: false
    };
  }
  componentDidUpdate() {
    if (!!this.state.loading) {
      // La doble negación nos permite validar si la variable es diferente de undefined y si es verdadero.
      setTimeout(() => {
        if (this.state.value === SECURITY_CODE)
          this.setState({ error: false, loading: false });
        else
          this.setState({ error: true, loading: false, value: '' })
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
          <input
            placeholder='Código de seguridad'
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
          <input
            type='button'
            value='Comprobar'
            onClick={() => this.setState({ loading: true, error: false })}
          />
        </div>
      </div>
    );
  }
}

export { ClassState };