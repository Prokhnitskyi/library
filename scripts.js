let myLibrary = [];
const addBookButton = document.querySelector('#show-add-modal');
const modal = document.querySelector('.add-book-modal');
const closeModalButton = document.querySelector('#close-modal');
const booksContainer = document.querySelector('.books-container');
const cardBlueprint = document.querySelector('#card-template');

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
    populate();
    form.reset();
}

function populate(elements = myLibrary) {
    booksContainer.innerHTML = '';
    elements.forEach((element, index) => {
        const card = cardBlueprint.content.cloneNode(true);
        card.querySelector('.book__read-switch').dataset.index = index.toString();
        card.querySelector('.book__remove').dataset.index = index.toString();
        card.querySelector('.book__title').textContent = element.title;
        card.querySelector('.book__author').textContent = element.author;
        card.querySelector('.book__pages').textContent = element.pages;
        card.querySelector('.book__read').textContent = element.read;
        booksContainer.append(card);
    });
}

addBookButton.addEventListener('click', () => modal.showModal());
closeModalButton.addEventListener('click', () => modal.close());
modal.addEventListener('submit', addBookToLibrary);