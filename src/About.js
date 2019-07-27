import React from 'react';

import q_and_a from './about_txt.js'

class Home extends React.Component {

  renderSection(dat) {
    return (
      <section key={dat.heading}>
        <h2>{dat.heading}</h2>
        {dat.content}
      </section>
      );
  }
  render() {
    const sections = q_and_a.map(this.renderSection);
    return <>{sections}</>;
  }
}

export default Home;

