import React from 'react';

import firestore from '../Firebase';



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
        firestore.collection('catfacts').add(value);
      });
  };
  render() {
    return <button onClick={this.addCatFact}>Add Cat Fact</button>;
  }
}

export default AddCat;
