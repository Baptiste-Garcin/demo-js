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
