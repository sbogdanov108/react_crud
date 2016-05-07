/**
 * Created by sb on 05.05.2016.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component
{
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount()
  {
    // id из адресной строки
    this.props.fetchPost( this.props.params.id );
  }

  onDeleteClick()
  {
    this.props.deletePost( this.props.params.id ).then( () =>
    {
      this.context.router.push( '/' );
    });
  }

  render()
  {
    // const post = this.props.post;
    const { post } = this.props; // es6

    // т.к. сначала рендерится при загрузки страницы, а запрост ещё не вернулся с сервера
    if( !this.props.post )
      return <div>Загрузка...</div>;

    return (
      <div>
        <div className="row">
          <h3 className="page-title">{ post.title }</h3>
          <h6>Категории: { post.categories }</h6>

          <p>{ post.content }</p>
        </div>

        <div className="row">
          <Link
            className="btn btn-primary"
            to="/"
          > Назад... </Link>

          <button
            className="btn btn-danger pull-xs-right"
            onClick={ this.onDeleteClick.bind( this ) }
          >
            Удалить пост
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps( state )
{
  return { post: state.posts.post };
}

export default connect( mapStateToProps, { fetchPost, deletePost } )( PostsShow );