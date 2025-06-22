import express, { Application} from 'express'
import { booksRouter } from './app/controllers/book.controller'
import { borrowRouter } from './app/controllers/borrow.controller'
const app: Application = express()

app.use(express.json())

app.use("/books", booksRouter);
app.use("/borrow", borrowRouter)

app.get('/', (req, res) => {
  res.send('Library management system')
})

export default app;