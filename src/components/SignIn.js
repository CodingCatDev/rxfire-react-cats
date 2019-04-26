import React from 'react';

class SignIn extends React.Component {
  render() {
    if (!this.props.user) {
      return (
        <button className="myButton" onClick={this.props.signIn}>
          1. Sign In
        </button>
      );
    } else {
      return (
        <div>
          <span>Welcome {this.props.user.email} </span>
          <button className="myButton" onClick={this.props.signOut}>
            4. Sign Out
          </button>
        </div>
      );
    }
  }
}

export default SignIn;
