import React from 'react';

import APITableMixin from './APITable';
import * as api from './api_helpers';
import * as dp from './display_helpers';

class Articles extends APITableMixin {
  headings = ['Article', 'RMs', 'Comments', 'Wiki links'];
  sortKeys = [
    {key:'rms', label:'RMs'},
    {key:'comments', label:'Comments'},
  ];
  get defaultSortKey() {
    return 'rms';
  }

  rows_api_call() {
    return api.api('articles', {sort:this.state.sortKey,
      n:this.state.n,
    });
  }

  renderRow(row) {
    return <ArticleRow key={row.article} dat={row} />;
  }
  render() {
    return (
    <section>
      <h1>Articles</h1>
      {this.renderTable()}
    </section>
      );
  }

}

class ArticleRow extends React.Component {
  render() {
    const row = this.props.dat;
    return (
        <tr key={row.article}>
          <td>
            {dp.render_article_link(row.article)}
          </td>
          <td>
            {row.rms.toLocaleString()}
          </td>
          <td>
            {row.comments.toLocaleString()}
          </td>
          <td>
            <a href={dp.wikilink(row.article)}>
            {row.article}
            </a>
            <a href={dp.wikilink('Talk:' + row.article)}> (talk)
            </a>
          </td>
        </tr>
        );
  }
}

export default Articles;

