import express, { Request, Response } from 'express'
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';

export const borrowRouter = express.Router()

borrowRouter.post('/', async (req: Request, res: Response)=> {
    try {
        const body = req.body;

        const book = await Book.findById(body.book)

        if(!book){
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            })
            return
        }


        const borrow = await Borrow.create(body)

        res.status(201).json({
            success: true,
            message: "Book borrow successfully",
            data: borrow
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Book borrow failed",
            error
        })
    }
})

borrowRouter.get('/', async(req: Request, res: Response)=> {
    try {
        const borrow = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: {$sum: "$quantity"}
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo"
                }
            },
            { $unwind: '$bookInfo' },
            {
                $project: {
                    _id: 0,
                    "book": {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn',
                    },
                    totalQuantity: 1
                }
            }
        ])


        res.status(201).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrow
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Borrowed books summary retrieved failed",
            error
        })
    }
})