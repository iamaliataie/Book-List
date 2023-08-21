// Book Class : Represent a book
class Book {
    constructor(title, author , isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI class : handle UI tasks
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title : "Book One",
                author : "John Doe",
                isbn : "12345678"
            },
            {
                title : "Book Two",
                author : "Jane Doe",
                isbn : "87654321"
            }
        ];

        const books = StoredBooks;
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(e){
        if(e.classList.contains('delete')) {
            e.parentElement.parentElement.remove();
        }
    }
    
    static showAlert(message, className){
        const messageSection = document.querySelector('#message');
        const messageBox = document.createElement('div');
        messageBox.classList = `alert alert-${className}`;
        messageBox.style.height = '50px';
        const messageText = document.createElement('p');
        messageText.innerText = message;
        messageBox.appendChild(messageText);
        messageSection.appendChild(messageBox);
        setTimeout(() => messageBox.remove() ,2000);
    }
}

// Event : display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event : add a book
document.querySelector("#book-form").addEventListener('submit', (e) =>{
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('fields cannot be emtpy','danger');
    }
    else{
        const book = new Book(title,author,isbn);

        UI.addBookToList(book);
        UI.showAlert('Book added successfully','success');
        UI.clearFields();
    }
    
})

// Event : remove a book
document.querySelector('#book-list').addEventListener('click',(e) => {
    UI.deleteBook(e.target);

    UI.showAlert('book removed','info');
})
