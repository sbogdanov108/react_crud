/**
 * Created by sb on 05.05.2016.
 */

import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component
{
  // что-то типа props; в основном, используется только в случае доступа к роуту
  static contextTypes = {
    router: PropTypes.object
  };

  // submit для формы
  onSubmit( props )
  {
    this.props.createPost( props ).then( () =>
    {
      // пост был создан, направлем юзера на индекс
      // Навигация происходит с помощью this.context.router.push создания нового пути для навигации
      this.context.router.push( '/' );
    });
  }

  render()
  {
    // const handleSubmit = this.props.handleSubmit;
    // const title = this.props.title
    // and etc.
    const { fields: { title, categories, content }, handleSubmit } = this.props; // es6

    return(
      <form onSubmit={ handleSubmit( this.onSubmit.bind( this ) ) }>
        <h3 className="page-title">Создать новый пост</h3>

        <div className={ `form-group ${ title.touched && title.invalid ? 'has-danger' : '' }` }>
          <label>Название</label>
          <input className="form-control" type="text" { ...title }/>

          <div className="text-help">
            { title.touched ? title.error : '' }
          </div>
        </div>

        <div className={ `form-group ${ categories.touched && categories.invalid ? 'has-danger' : '' }` }>
          <label>Категории</label>
          <input className="form-control" type="text" { ...categories }/>

          <div className="text-help">
            { categories.touched ? categories.error : '' }
          </div>
        </div>

        <div className={ `form-group ${ content.touched && content.invalid ? 'has-danger' : '' }` }>
          <label>Содержание</label>
          <textarea className="form-control" cols="30" rows="10" { ...content }/>

          <div className="text-help">
            { content.touched ? content.error : '' }
          </div>
        </div>

        <button className="btn btn-primary" type="submit">Отправить</button>

        <Link className="btn btn-warning" to="/">
          Отменить
        </Link>
      </form>
    )
  }
}

function validate( values )
{
  const errors = {};

  if( !values.title )
    errors.title = 'Введите название';

  if( !values.categories )
    errors.categories = 'Введите категорию';

  if( !values.content )
    errors.content = 'Введите содержание';

  return errors;
}

// connect: первый аргумент - это mapStateToProps; второй - mapDispatchToProps
// reduxForm: первый аргумент - это конфиг формы; второй - mapStateToProps; третий - это mapDispatchToProps

// передаем конфу для формы
export default reduxForm({
  form: 'PostNewForm',
  fields: [ 'title', 'categories', 'content' ],
  validate
}, null, { createPost } )( PostsNew );