import React from 'react'

class Book extends React.Component {
    render() {
      const book = this.props.data;
      return (
        <div className="card bg-danger text-white">
            <div className="card-body">
                <h2>Autor: {book.author}</h2>
                <h2>Titulo: {book.title}</h2>
                <h2>Description: {book.description}</h2>
            </div>
        </div>
      );
    }
  }
export default Book;
