import React from 'react';

import RMTable from './RMTable';
import * as api from './api_helpers';
import * as dp from './display_helpers';

class Article extends RMTable {
  sortKeys = [
    {label: 'Recent', key: 'recent', },
    {label: 'Popular', key: 'big', },
  ];
  get defaultSortKey() { return 'recent'; }

  get article() {
    return this.props.match.params.article;
  }
  get articleDecoded() {
    return dp.urldecode(this.article);
  }

  rows_api_call() {
    return api.api('/articles/'+this.article,
        {n:this.state.n, sort:this.state.sortKey}
    );
  }

  render() {
    return (
      <section>
        <h1>
        RM discussions involving <a 
          href={"https://en.wikipedia.org/wiki/"+this.article}
          >{this.articleDecoded}</a>
        </h1>
        {this.renderTable()}
      </section>
      );
  }

}

export default Article;


