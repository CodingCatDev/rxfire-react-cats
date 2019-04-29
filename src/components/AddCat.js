import React from 'react';

import { firestore } from '../Firebase';
import catFacts from '../random.js';

class AddCat extends React.Component {
  addCatFact = async () => {
    try {
      const value = catFacts[Math.floor(Math.random() * catFacts.length)];
      await firestore
        .collection('catfacts')
        .add({ ...value, uid: this.props.user.uid, catFactDate: new Date() });
    } catch (error) {
      console.error(error);
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
