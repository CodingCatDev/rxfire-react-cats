import './App.css';

import React from 'react';

import AddCat from './components/AddCat';
import Instructions from './components/Instructions';
import ListCatFacts from './components/ListCatFacts';
import SignIn from './components/SignIn';
import { firestore, loggedIn$ } from './Firebase';

class App extends React.Component {
  state = {
    user: null
  };
  componentDidMount() {
    /* Observable from RxFire */
    loggedIn$.subscribe(user => {
      this.authHandler({ user }); //Update state on load of app
      const { displayName, email, phoneNumber, photoURL } = user;
      firestore
        .collection('users')
        .doc(user.uid)
        .set({ displayName, email, phoneNumber, photoURL });
    });
  }
  authHandler = async authData => {
    this.setUser(authData.user);
  };
  setUser = user => {
    this.setState({
      user: user
    });
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
            authHandler={this.authHandler}
            setUser={this.setUser}
          />
          <div style={{ maxWidth: '800px' }}>
            <AddCat user={this.state.user} />
            <ListCatFacts user={this.state.user} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
