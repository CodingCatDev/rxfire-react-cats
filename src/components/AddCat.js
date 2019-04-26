import React from 'react';

import { firestore } from '../Firebase';

class AddCat extends React.Component {
  state = {
    catfacts: null
  };
  addCatFact = () => {
    /* The dreaded CORS, had to pass through a proxy */
    fetch(
      `https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1`
    )
      .then(blob => blob.json())
      .then(value => {
        console.log('fetched', value);
        firestore
          .collection('catfacts')
          .add({ ...value, uid: this.props.user.uid, catFactDate: new Date() })
          .then(
            () => {},
            reason => {
              alert('Must Be Logged In To Add, See Console');
              console.log('Failed Adding Cat Fact', reason);
            }
          );
      });
  };
  render() {
    let addCatButton = null;
    if (this.props.user)
      addCatButton = (
        <button className="myButton" onClick={this.addCatFact}>
          2. Add Cat Fact
        </button>
      );
    return addCatButton;
  }
}

export default AddCat;
