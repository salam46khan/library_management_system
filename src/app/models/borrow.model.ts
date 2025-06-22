import { model, Schema } from "mongoose"
import { IBorrow } from "../interfaces/borrow.interface"
import { Book } from "./book.model";

const borrowSchema = new Schema<IBorrow>(
    {
        book: {
            type: Schema.Types.ObjectId,
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
                validator: function (value: Date) {
                    return value > new Date();
                },
                message: 'Due date must be a future date',
            },
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

borrowSchema.pre('save', async function(){
    const book = await Book.findById(this.book)
    if(book){
        book.copies = book.copies - this.quantity;
        
        if(book.copies === 0){
            book.available = false
        }
        
        await book?.save()
    }
    
})

export const Borrow = model<IBorrow>("Borrow", borrowSchema)