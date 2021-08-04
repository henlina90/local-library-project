// input: books as an array of objects
// output: the total number of book objects inside of the array
const getTotalBooksCount = (books) => books.length;

// input: accounts as an array of account objects
// output: the total number of account objects inside of the array
const getTotalAccountsCount = (accounts) => accounts.length;

// input: books as an array of book objects
// output: the total number of books that are currently borrowed
const getBooksBorrowedCount = (books) => {
  return books.reduce((acc, book) => {
    if (book.borrows.some((book) => book.returned === false)) {
      acc++;
    }
    return acc;
  }, 0);
};

// helper function for first five list
const getFirstFive = (array) => array.slice(0, 5);

// input: books as an array of objects
// output: an array of objects in ordered list of first five most common genres
// ^ each object in the returned array has two keys: name, count
const getMostCommonGenres = (books) => {
  let result = [];
  const genres = books.map((books) => books.genre);
  for (let genre of genres) {
    if (!result.some((genres) => genres.name === genre)) {
      result.push({ name: genre, count: 1 });
    } else {
      result.map((genres) => {
        if (genres.name === genre) {
          genres.count++;
        }
      });
    }
  }
  return getFirstFive(result.sort((a, b) => b.count - a.count));
};

// input: books as an array of objects
// output: an array of objects in ordered list of first five most popular books
// ^ each object in the returned array has two keys: name, count
const getMostPopularBooks = (books) => {
  const result = [];
  books
    .sort((a, b) => b.borrows.length - a.borrows.length)
    .forEach((books) =>
      result.push({ name: books.title, count: books.borrows.length })
    );
  return getFirstFive(result);
};

// input: books as an array of objects, authors as an array of objects
// output: an array of objects in ordered list of first five most popular authors
// ^ each object in the returned array has two keys: name, count
const getMostPopularAuthors = (books, authors) => {
  const result = [];
  authors.forEach((author) => {
    let obj = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
    };
    books.forEach((book) => {
      if (book.authorId === author.id) {
        obj.count += book.borrows.length;
      }
    });
    result.push(obj);
  });
  result.sort((a, b) => b.count - a.count);

  return getFirstFive(result);
};

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
