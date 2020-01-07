import Book from "../../models/Book";

export default async function(ctx: any) {
  ctx.res = {
    count: await Book.countDocuments(Book.find({}).getQuery()),
    nodes: await Book.find({}).lean()
  };
}
