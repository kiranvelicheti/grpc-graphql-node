import Book from "../../models/Book";

export default async function(ctx: any) {
  const book = new Book(ctx.req);
  await book.save();
  ctx.res = book;
}
