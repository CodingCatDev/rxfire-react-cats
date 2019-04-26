import './App.css';

import React from 'react';

import AddCat from './components/AddCat';
import Instructions from './components/Instructions';
import ListCatFacts from './components/ListCatFacts';
import SignIn from './components/SignIn';
import firebase, { app, firestore, loggedIn$ } from './Firebase';

class App extends React.Component {
  state = {
    user: null
  };
  componentDidMount() {
    loggedIn$.subscribe(user => {
      this.authHandler({ user });
      const { displayName, email, phoneNumber, photoURL } = user;
      firestore
        .collection('users')
        .doc(user.uid)
        .set({ displayName, email, phoneNumber, photoURL });
    });
  }
  authHandler = async authData => {
    this.setState({
      user: authData.user
    });
  };
  signIn = () => {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    app
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };
  signOut = async () => {
    await firebase.auth().signOut();
    this.setState({ user: null });
  };
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexFlow: 'row wrap'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexFlow: 'column'
          }}
        >
          <Instructions />
          <SignIn
            user={this.state.user}
            signIn={this.signIn}
            signOut={this.signOut}
          />
          <div>
            <AddCat user={this.state.user} />
            <ListCatFacts user={this.state.user} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
