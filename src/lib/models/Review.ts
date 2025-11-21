// src/lib/models/Review.ts
import mongoose, { Schema, Model } from 'mongoose';

export interface IReview {
    _id?: string;
    id: string;
    bookId: string;
    author: string;
    rating: number;
    title: string;
    comment: string;
    timestamp: string;
    verified: boolean;
}

const ReviewSchema = new Schema<IReview>({
    id: { type: String, required: true, unique: true },
    bookId: { type: String, required: true },
    author: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    timestamp: { type: String, required: true },
    verified: { type: Boolean, required: true },
}, {
    timestamps: true,
});

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
