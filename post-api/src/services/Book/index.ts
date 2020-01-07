import addBook from "./addBook";
import listBooks from "./listBooks";

const protoPath = `${__dirname}/Book.proto`;

export default {
  protoPath,
  implementation: {
    BookService: {
      addBook,
      listBooks
    }
  }
};
