// input: accounts as an array of objects, an ID of a single account
// output: the account object that has the matching ID
const findAccountById = (accounts, id) =>
  accounts.find((account) => account.id === id);

// input: accounts as an array of objects
// output: an array of account objects sorted alphabetically by last name
const sortAccountsByLastName = (accounts) => {
  return accounts.sort((a, b) =>
    a.name.last.toLowerCase().localeCompare(b.name.last.toLowerCase())
  );
};

// input: account as an object, books as an array of all books
// output: a num that reps the num of times the account's ID appears in any book's 'borrow' array
const getTotalNumberOfBorrows = (account, books) => {
  let totalNum = 0;
  books.forEach((book) =>
    book.borrows.find((borrow) => (borrow.id === account.id ? totalNum++ : 0))
  );
  return totalNum;
};

// input: an account object, an array of all books objects, an array of all author objects
// output: an array of books & authors that reps all books currently checked out by the given account
// ^ the author object is embedded inside of the array of objects
const getBooksPossessedByAccount = (account, books, authors) => {
  const booksPossessed = [];
  books.forEach((book) => {
    book.borrows.find((borrow) => {
      if (borrow.id === account.id && borrow.returned === false) {
        authors.find((author) => {
          if (book.authorId === author.id) {
            book.author = author;
            booksPossessed.push(book);
          }
        });
      }
    }, []);
  }, []);
  return booksPossessed;
};

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
