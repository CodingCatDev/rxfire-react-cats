import React from 'react';

import firestore, { collectionData } from '../Firebase';

class ListCatFacts extends React.Component {
  state = {
    catfacts: []
  };
  componentDidMount() {
    const catFactsRef = firestore.collection('catfacts');
    collectionData(catFactsRef, 'catFactId').subscribe(catfacts => {
      console.log('firestoreList', catfacts);
      // re-render on each change
      this.setState({ catfacts });
    });
  }
  componentWillUnmount() {}
  render() {
    return (
      <>
        {this.state.catfacts.map(catFact => {
          return (
            <div key={catFact.catFactId}>
              <span role="img" aria-label="fun-cat">
                😺
              </span>
              <span>{catFact.text}</span>
            </div>
          );
        })}
      </>
    );
  }
}

export default ListCatFacts;
