// src/lib/models/Book.ts
import mongoose, { Schema, Model } from 'mongoose';

export interface IBook {
    _id?: string;
    id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    image: string;
    isbn: string;
    genre: string[];
    tags: string[];
    datePublished: string;
    pages: number;
    language: string;
    publisher: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    featured: boolean;
}

const BookSchema = new Schema<IBook>({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    isbn: { type: String, required: true },
    genre: [{ type: String }],
    tags: [{ type: String }],
    datePublished: { type: String, required: true },
    pages: { type: Number, required: true },
    language: { type: String, required: true },
    publisher: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewCount: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    featured: { type: Boolean, required: true },
}, {
    timestamps: true,
});

const Book: Model<IBook> = mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);

export default Book;
