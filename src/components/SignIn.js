import React from 'react';

import firebase, { app } from '../Firebase';

class SignIn extends React.Component {
  signIn = () => {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    app
      .auth()
      .signInWithPopup(authProvider)
      .then(this.props.authHandler);
  };
  signOut = async () => {
    await firebase.auth().signOut();
    this.props.setUser(null);
  };
  render() {
    if (!this.props.user) {
      return (
        <button className="myButton" onClick={this.signIn}>
          1. Sign In
        </button>
      );
    } else {
      return (
        <div>
          <span>Welcome {this.props.user.email} </span>
          <button className="myButton" onClick={this.signOut}>
            4. Sign Out
          </button>
        </div>
      );
    }
  }
}

export default SignIn;
