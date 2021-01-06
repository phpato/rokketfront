import React from 'react';
import axios from 'axios';
import Book from './Book';
import swal from 'sweetalert2';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {
                _id: "",
                title: "",
                author: "",
                description: "",
            },
            books: [],
            errors: [],
            showing: false,
            adding: false,
            loading: false
        };
        this.formAddBook = this.formAddBook.bind(this)
    }

    async getItems() {
        this.setState({loading: true});
        const servicesResponse = await axios.get('http://localhost:3000/items');
        const {data} = await servicesResponse;
        this.setState({books: data.books, loading: false});
    }

    async formAddBook(event) {
        event.preventDefault();
        if(this.validateForm()){
            const book = this.state.book;
            try{
                const savedBookResponse = await axios.post('http://localhost:3000/items', book);
                this.cleanForm();
                this.getItems();
                swal.fire({
                    title: "Exito",
                    text: "Libro guardado!",
                    icon: "success"
                });
            }catch(error){
                swal.fire({
                    title: "Error",
                    text: "Libro con el titulo ya existe!!",
                    icon: "error"
                });
            }

        }
    }

    async deleteBook(book) {
        try{
            const deletedBookResponse = await axios.delete( `http://localhost:3000/items/${book._id}`);
            swal.fire({
                title: "Exito",
                text: "Libro eliminado!",
                icon: "success"
            });
            this.cleanForm();
            this.getItems();
        }catch(error){
            swal.fire({
                title: "Error",
                text: "Error al eliminar el libro",
                icon: "error"
            });
        }

    }

    componentDidMount() {
        this.getItems();
    }

    checkBook = (book) => {
        this.setState({showing: !this.state.showing, book});
    }

    addBook = () => {
        this.setState({book: {}, adding: !this.state.adding})
    }

    cleanForm = () => {
        this.setState({book: {}, adding: false, showing: false});
    }

    validateForm = () => {
        let errors = []
        if(!this.state.book.title){
            errors.push("Debe ingresar un titulo");
        }
        if(!this.state.book.author){
            errors.push("Debe ingresar un autor");
        }
        if(!this.state.book.description){
            errors.push("Debe ingresar una descripcion");
        }
        this.setState({errors})
        if(errors.length){
            return false;
        }
        return true;
    }

    setTitle = (value) => {
        this.setState({ book: {...this.state.book, title: value } })
    }

    setAuthor = (value) => {
        this.setState({ book: {...this.state.book, author: value } })
    }

    setDescription = (value) => {
        this.setState({ book: {...this.state.book, description: value } })
    }
    
    render() {
        const books = this.state.books;
        const errors = this.state.errors;
        return (
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-12">
                        {this.state.errors.length 
                            ? 
                                <div className="card-body bg-danger text-white">
                                    <ul>
                                        {errors.map(error =>{
                                        return <li key={error}>{error}</li>;
                                    })}
                                    </ul>
                                </div>
                            :
                            ""
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <br/>
                        <div className="card">
                            <div className="card-header text-white bg-primary">
                                Libros
                            </div>
                            <div className="card-body">
                                <button className={this.state.adding ? "btn btn-danger" : "btn btn-success"} onClick={this.addBook}>
                                    {this.state.adding ? "Cancelar" : "Crear"}
                                </button>
                                <br />
                                
                               
                                    {this.state.adding 
                                    ? 
                                    <div>
                                        <br />
                                        <div className="form-group">
                                            <label className="text-white">Autor:</label>
                                            <input className="form-control" type="text" onChange={e => this.setAuthor(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="text-white">Titulo:</label>
                                            <input className="form-control" type="text" onChange={e => this.setTitle(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="text-white">Descripcion:</label>
                                            <textarea className="form-control" type="text" onChange={e => this.setDescription(e.target.value)} />
                                        </div>
                                        <div className="form-group text-center">
                                            <button className="btn btn-info" onClick={e => this.formAddBook(e)}> 
                                            <i className="fa fa-save"></i> Guardar</button>
                                        </div>
                                    </div>
                                    :
                                    ""}
                               <br />
                                <div className="row">
                                    <div className={this.state.showing? "col-6" : "col-12"}>
                                        <ul className="list-group">                          
                                            {
                                                this.state.loading 
                                                ?
                                                <div className="fa-3x">
                                                    Cargando...
                                                </div>
                                                :
                                                books.length
                                                ?
                                                    books.map(book => {
                                                        return  <li key={book._id} className="list-group-item text-white">
                                                                    {book.title}
                                                                    <p>
                                                                        <button className="btn btn-info" onClick={() => this.checkBook(book)}> 
                                                                        <i className="fa fa-eye"></i>
                                                                        {this.state.showing && book._id === this.state.book._id? "Cerrar" : "Ver"}
                                                                        </button>
                                                                        <button className="btn btn-danger" onClick={() => this.deleteBook(book)}>
                                                                        <i className="fa fa-trash"></i> Eliminar</button>
                                                                    </p>
                                                                </li>
                                                    })
                                                :
                                                <div className = "card-body bg-danger text-white">
                                                    Sin libros
                                                </div>
                                            }
                                        </ul>
                                    </div>
                                    <div className={this.state.showing ? "col-6": ""}>
                                        { this.state.showing? <Book data={this.state.book} /> : null }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;