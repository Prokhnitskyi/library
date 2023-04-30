let myLibrary = [];
const addBookButton = document.querySelector('#show-add-modal');
const modal = document.querySelector('.add-book-modal');
const closeModalButton = document.querySelector('#close-modal');

function Book({title = '', author = '', pages = 0, read = false}) {
    this.title = title;
    this.author = author;
    this.pages = read;
    this.read = read;
}

function addBookToLibrary(event) {
    console.log('test');
}

addBookButton.addEventListener('click', () => modal.showModal());
closeModalButton.addEventListener('click', () => modal.close());
modal.addEventListener('submit', addBookToLibrary);