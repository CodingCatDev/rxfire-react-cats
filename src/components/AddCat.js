import React from 'react';

import { firestore } from '../Firebase';

class AddCat extends React.Component {
  addCatFact = async () => {
    try {
      /* The dreaded CORS, had to pass through a proxy */
      const blob = await fetch(
        `https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1`
      );
      const value = await blob.json();
      await firestore
        .collection('catfacts')
        .add({ ...value, uid: this.props.user.uid, catFactDate: new Date() });
    } catch (error) {
      console.error(error);
      await firestore.collection('catfacts').add({
        text: `API Failed so, Random cat fact #${Math.round(
          Math.random() * 1000000
        )}`,
        uid: this.props.user.uid,
        catFactDate: new Date()
      });
    }
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
