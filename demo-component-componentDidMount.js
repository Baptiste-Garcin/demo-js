import React from 'react';

class DummyComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    }
  }

  // Ici, on utilise une methode du cycle de vie du composant React. Celle-ci est déclenché une fois que le componsant est 'monté',
  // c'est à dire qu'il a été affiché une première fois. On utilise cette méthode précisément pour qu'une page (même incomplète) soit affiché à l'utilisateur
  componentDidMount = async () => {
    // Ici, on appelle le endpoint GET /user de l'API en lui passant this.proos.userId comme paramètre d'URL
    const user = await axios.get(`/user/${this.proos.userId}`)
    // une fois la requête executée, on stock le retour dans notre state
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }):
  }
  
  render() {
    // ici, on affiche et on met en forme les données récupérées de l'API
    return (
      <div>
         <h3>User data </h3>
         <ol>
            <li>firstName: {this.state.firstName}</li>
            <li>lastName: {this.state.lastName}</li>
            <li>email: {this.state.email}</li>
         </ol>
      </div>
    );
  }
}
