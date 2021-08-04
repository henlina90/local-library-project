// input: authors as an array of objects, ID of a single author
// output: the author object that has the matching ID
const findAuthorById = (authors, id) => {
  return authors.find((author) => author.id === id);
};

// input: books as an array of objects, ID of a single author
// output: the book object that has the matching ID
const findBookById = (books, id) => {
  return books.find((book) => book.id === id);
};

// input: books as an array of objects
// output: an array with two arrays: borrowed books, returned books
const partitionBooksByBorrowedStatus = (books) => {
  let borrowed = [];
  let returned = [];
  books.filter((book) =>
    book.borrows.some((aBook) =>
      aBook.returned === true ? returned.push(aBook) : borrowed.push(aBook)
    )
  );
  return [borrowed, returned];
};

// input: book as an object, accounts as an array of all accounts
// output: an array for a book of all borrowers with their info and return status
// ^ only return first ten borrowers
const getBorrowersForBook = (book, accounts) => {
  let borrowers = [];
  let borrowed = book.borrows;
  borrowed.forEach((borrow) => {
    let account = accounts.find((acc) => acc.id === borrow.id);
    let accountObj = account;
    accountObj.returned = borrow.returned;
    borrowers.push(accountObj);
  });
  return borrowers.slice(0, 10);
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
