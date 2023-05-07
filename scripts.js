const addBookButton = document.querySelector('#show-add-modal');
const modal = document.querySelector('.add-book-modal');
const closeModalButton = document.querySelector('#close-modal');
const booksContainer = document.querySelector('.books-container');
const cardBlueprint = document.querySelector('#card-template');

class Book {
    static parentLibrary = null;

    constructor ({title = '', author = '', pages = 0, read = false}) {
        this.uuid = uuidv4();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    switchReadStatus() {
        this.read = !this.read;
        if (Book.parentLibrary) {
            Book.parentLibrary.populate();
        }
    }

    removeSelf() {
        if (!Book.parentLibrary) return;
        const index = Book.parentLibrary.shelf.indexOf(this);
        Book.parentLibrary.shelf.splice(index, 1);
        Book.parentLibrary.populate();
    }
}

class Library {
    constructor () {
        this.shelf = JSON.parse(localStorage.getItem('library')) || [];
    }

    populate(initial = false) {
        booksContainer.innerHTML = '';
        this.shelf.forEach((element) => {
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
            localStorage.setItem('library', JSON.stringify(this.shelf));
        }
    }

    add(event) {
        const form = event.target;
        const addedBook = new Book({
            title: form.title.value,
            author: form.author.value,
            pages: parseInt(form.pages.value) || 0,
            read: form.read.checked
        });
        this.shelf.push(addedBook);
        this.populate();
        form.reset();
    }

    remove(event) {
        const book = this.get(event, '.book__remove');
        if (book) book.removeSelf();
    }

    get(event, selector = '') {
        const button = event.target.closest(selector);
        if (!button) return null;

        return this.shelf.find((elem) => elem.uuid === button.dataset.uuid);
    }

    read(event) {
        const book = this.get(event, '.book__read-switch');
        if (book) book.switchReadStatus();
    }

    initBookCards() {
        this.shelf.forEach((book) => {
            Object.setPrototypeOf(book, Book.prototype);
        });
        this.populate(true);
    }
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const library = new Library();
Book.parentLibrary = library;

addBookButton.addEventListener('click', () => modal.showModal());
closeModalButton.addEventListener('click', () => modal.close());
modal.addEventListener('submit', event => library.add(event));
document.addEventListener('DOMContentLoaded', () => library.initBookCards());
booksContainer.addEventListener('click', event => library.remove(event));
booksContainer.addEventListener('click', event => library.read(event));