let myLibrary = JSON.parse(localStorage.getItem('library')) || [];
const addBookButton = document.querySelector('#show-add-modal');
const modal = document.querySelector('.add-book-modal');
const closeModalButton = document.querySelector('#close-modal');
const booksContainer = document.querySelector('.books-container');
const cardBlueprint = document.querySelector('#card-template');

function Book({title = '', author = '', pages = 0, read = false}) {
    this.uuid = uuidv4();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.switchReadStatus = function () {
    console.log('it works');
    this.read = !this.read;
    populate();
}

Book.prototype.removeSelf = function () {
    const index = myLibrary.indexOf(this);
    myLibrary.splice(index, 1);
    populate();
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

function populate(initial = false) {
    booksContainer.innerHTML = '';
    myLibrary.forEach((element) => {
        const card = cardBlueprint.content.cloneNode(true);
        card.querySelector('.book__read-switch').dataset.uuid = element.uuid;
        card.querySelector('.book__remove').dataset.uuid = element.uuid;
        card.querySelector('.book__title').textContent += element.title;
        card.querySelector('.book__author').textContent += element.author;
        card.querySelector('.book__pages').textContent += element.pages;
        card.querySelector('.book__read').textContent += element.read;
        booksContainer.append(card);
    });

    if (!initial) {
        localStorage.setItem('library', JSON.stringify(myLibrary));
    }

}

function initBookCards() {
    myLibrary.forEach((book) => {
        Object.setPrototypeOf(book, Book.prototype);
    });
    populate(true);
}

function removeBook(event) {
    const book = getBook(event, '.book__remove');
    if (book) book.removeSelf();
}

function readBook(event) {
    const book = getBook(event, '.book__read-switch');
    if (book) book.switchReadStatus();
}

function getBook(event, selector = '') {
    const button = event.target.closest(selector);
    if (!button) return null;

    return myLibrary.find((elem) => elem.uuid === button.dataset.uuid);
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

addBookButton.addEventListener('click', () => modal.showModal());
closeModalButton.addEventListener('click', () => modal.close());
modal.addEventListener('submit', addBookToLibrary);
document.addEventListener('DOMContentLoaded', initBookCards);
booksContainer.addEventListener('click', removeBook);
booksContainer.addEventListener('click', readBook);