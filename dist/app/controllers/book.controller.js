"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.booksRouter = express_1.default.Router();
exports.booksRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Book created failed',
            error,
        });
    }
}));
exports.booksRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = req.query.filter;
        let limit = 10;
        if (req.query.limit) {
            limit = req.query.limit;
        }
        let sort = req.query.sort === 'asc' ? 1 : -1;
        let sortBy = req.query.sortBy;
        let book;
        if (query) {
            book = yield book_model_1.Book.find({ genre: query }).sort({ [sortBy]: sort }).limit(limit);
        }
        else {
            book = yield book_model_1.Book.find().sort({ [sortBy]: sort }).limit(limit);
        }
        res.status(201).json({
            success: true,
            message: 'Books retrieved successfully',
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve books',
            error,
        });
    }
}));
exports.booksRouter.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findById(bookId);
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Book retrieved failed',
            error
        });
    }
}));
exports.booksRouter.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updateBook = req.body;
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, updateBook, { new: true });
        res.status(201).json({
            success: true,
            message: "Book update successfully",
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Book update failed",
            error
        });
    }
}));
exports.booksRouter.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(201).json({
            success: true,
            message: 'Book delete successfully',
            data: null
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Book delete failed',
            error
        });
    }
}));
