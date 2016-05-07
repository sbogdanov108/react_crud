/**
 * Created by sb on 02.05.2016.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component
{
  // реакт дергает это, когда дом рендерится в первый раз; Lifecycle method
  componentWillMount()
  {
    this.props.fetchPosts();
  }

  renderPosts()
  {
    return this.props.posts.map( ( post ) =>
    {
      return (
        <tr key={ post.id }>
          <td>
            { post.categories }
          </td>
          <td>
            <Link to={ 'posts/' + post.id }>
              <strong>{ post.title }</strong>
            </Link>
          </td>
        </tr>
      );
    });
  }

  render()
  {
    return (
      <div>
        <h3 className="page-title">Посты</h3>

        <div className="row">
          <Link to="/posts/new" className="btn btn-primary btn-sm btn-addPost">
            Добавить пост
          </Link>
        </div>

        <div className="row">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Категории</th>
                <th>Название</th>
              </tr>
            </thead>

            <tbody>
              { this.renderPosts() }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

/*function mapDispatchToProps( dispatch )
{
  return bindActionCreators( { fetchPosts }, dispatch );
}*/

function mapStateToProps( state )
{
  return { posts: state.posts.all };
}

// export default connect( null, { fetchPosts: fetchPosts } )( PostsIndex );
export default connect( mapStateToProps, { fetchPosts } )( PostsIndex );
