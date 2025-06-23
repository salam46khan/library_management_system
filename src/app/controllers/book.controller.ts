import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const booksRouter = express.Router()

booksRouter.post('/', async(req: Request, res: Response)=> {
    try {
        const body = req.body;
        const book = await Book.create(body)

        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        })
    } catch (error) {
        res.status(500).json({
        success: false,
        message: 'Book created failed',
        error,
        })
    }
})


booksRouter.get('/', async(req: Request, res: Response)=>{
    try {
        let query = req.query.filter;

        let limit: any = 10;

        if(req.query.limit){
            limit = req.query.limit
        }

        let sort: any = req.query.sort === 'asc'? 1: -1;
        let sortBy : any = req.query.sortBy;

        let book;

        if (query) {
            book = await Book.find({genre: query}).sort({[sortBy]: sort}).limit(limit)
        } else {
            book = await Book.find().sort({[sortBy]: sort}).limit(limit)
        }

        res.status(201).json({
            success: true,
            message: 'Books retrieved successfully',
            data: book
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve books',
            error,
        })
    }
})

booksRouter.get('/:bookId', async(req: Request , res: Response)=> {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId)
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Book retrieved failed',
            error
        })
    }
})

booksRouter.put('/:bookId', async (req: Request , res: Response)=> {
    try {
        const bookId = req.params.bookId;
        const updateBook = req.body;

        const book = await Book.findByIdAndUpdate(bookId, updateBook, {new: true})

        res.status(201).json({
            success: true,
            message: "Book update successfully",
            data: book
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Book update failed",
            error
        })
    }
})

booksRouter.delete('/:bookId', async(req:Request, res: Response)=> {
    try {
        const bookId = req.params.bookId;
        await Book.findByIdAndDelete(bookId)

        res.status(201).json({
            success: true,
            message: 'Book delete successfully',
            data: null
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Book delete failed',
            error
        })
    }
})