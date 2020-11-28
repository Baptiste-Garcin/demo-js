import React from 'react';

class DummyComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange(event) {
    this.setState({
      // Ici, c'est une syntax un peu particulière, elle permet de définir dynamiquement la clé d'un objet.
      // Selon que la fonction est appelée à partir de l'input password ou email, event.target.name sera "email" ou "password"
      // Et donc le bon champ sera mis à jour. Avec cette technique, tu as uen seule fonction pour tous tes champs.
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <div>
        <input name="email" onChange={this.handleChange} />
        <input name="password" onChange={this.handleChange} />
      </div>
    );
  }
}
