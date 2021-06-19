//book class: this represents a book and instantiate anytime we add a book
class Book{
    constructor( title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


//UI Class: handles UI tasks
class UI{
    static displayBooks(){
        const StoreBooks = [
            {
                title: 'Book One',
                author: 'Jon Dexter',
                isbn: '3434434',
            },
            {
                title: 'Book Two',
                author: 'Jane Mensah',
                isbn: '4568923'
            }
        ];
        const Books = Store.getBooks();
        Books.forEach( function(book){
            UI.addBookToList(book);
        });

        
    }
    static  addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td a href='#' class="btn btn-danger btn-sm delete"> X </td>
        `;

        list.appendChild(row);
        

    };

    static removeBook(row){
        const list = document.querySelector("#book-list");
        list.removeChild(row)
    };

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);
        //set timeout to remove
        setTimeout(()=> document.querySelector(".alert").remove(), 3000
        );
    };

    static clear(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value= '';
        document.querySelector('#isbn').value = '';
    };

    
   
    
}

//Storage Class:  store in the browser
class Store{
    static getBooks(){
        let books;
        if (localStorage.getItem('book')== null){
            books = [];
            
        } else {
            books = JSON.parse(localStorage.getItem('book'));
        }
        return books;
        
    };

    static addBook(book){
        
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('book', JSON.stringify(books));
    };

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index)=> {
            if(book.isbn == isbn){
                books.splice(index, 1);
                console.log(isbn)
            }
        console.log(books)
        });

        localStorage.setItem('book', JSON.stringify(books));

    };
}



//Events: display book
document.addEventListener('DOMContentLoaded', UI.displayBooks)

//Event:  add a book
document.querySelector("#book-form").addEventListener("submit", function(e){
    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const book = new Book(title, author, isbn);
    if (title && author && isbn){
        UI.addBookToList(book);

        //add book
        Store.addBook(book);
        
        UI.showAlert('Book added successfully', 'success');
    }else{
        //let the user enter all the fields
        UI.showAlert('Please fill the fields', 'danger');

    }

    //then we clear the fields
    UI.clear();
})

//Event: remove a book
document.querySelector("#book-list").addEventListener("click", function(e){
    if (e.target.classList.contains('delete')){
        const row = e.target.parentNode;
        UI.removeBook(row);
        const row_isbn = e.target.previousElementSibling.textContent;
        //remove from local store
        Store.removeBook(row_isbn);
        UI.showAlert('Book removed successfully', 'success');
    }
})



