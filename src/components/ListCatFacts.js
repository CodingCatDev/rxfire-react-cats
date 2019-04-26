import React from 'react';

import { collectionData, firestore } from '../Firebase';

class ListCatFacts extends React.Component {
  state = {
    catfacts: []
  };
  componentDidMount() {
    const catFactsRef = firestore.collection('catfacts');
    collectionData(
      catFactsRef.orderBy('catFactDate', 'desc'),
      'catFactId'
    ).subscribe(catfacts => {
      console.log('firestoreList', catfacts);
      // re-render on each change
      this.setState({ catfacts });
    });
  }
  componentWillUnmount() {}
  render() {
    return (
      <>
        <h3>Firestore Collection "catfacts"</h3>
        {this.state.catfacts.map(catFact => {
          let myFact;
          if (this.props.user && this.props.user.uid === catFact.uid) {
            myFact = (
              <span role="img" aria-label="fun-cat">
                😻
              </span>
            );
          } else {
            myFact = (
              <span role="img" aria-label="fun-cat">
                😺
              </span>
            );
          }
          return (
            <div key={catFact.catFactId}>
              {myFact}
              <span>{catFact.text}</span>
            </div>
          );
        })}
      </>
    );
  }
}

export default ListCatFacts;
