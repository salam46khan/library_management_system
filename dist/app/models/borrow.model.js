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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("./book.model");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        min: [1, 'Borrow quantity must be at least 1'],
        required: true
    },
    dueDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: 'Due date must be a future date',
        },
    }
}, {
    versionKey: false,
    timestamps: true
});
borrowSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.Book.findById(this.book);
        if (book) {
            book.copies = book.copies - this.quantity;
            if (book.copies === 0) {
                book.available = false;
            }
            yield (book === null || book === void 0 ? void 0 : book.save());
        }
    });
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
