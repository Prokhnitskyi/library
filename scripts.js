let myLibrary = [];
const addBookButton = document.querySelector('#show-add-modal');
const modal = document.querySelector('.add-book-modal');
const closeModalButton = document.querySelector('#close-modal');

function Book({title = '', author = '', pages = 0, read = false}) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(event) {
    const form = event.target;
    const addedBook = new Book({
        title: form.title.value,
        author: form.author.value,
        pages: parseInt(form.pages.value) || 0,
        read: form.read.checked
    });
    myLibrary.push(addedBook);
}

addBookButton.addEventListener('click', () => modal.showModal());
closeModalButton.addEventListener('click', () => modal.close());
modal.addEventListener('submit', addBookToLibrary);