// src/lib/models/Cart.ts
import mongoose, { Schema, Model } from 'mongoose';

export interface ICartItem {
    bookId: string;
    quantity: number;
}

export interface ICart {
    _id?: string;
    userId?: string;
    items: ICartItem[];
    createdAt?: Date;
    updatedAt?: Date;
}

const CartItemSchema = new Schema<ICartItem>({
    bookId: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
}, { _id: false });

const CartSchema = new Schema<ICart>({
    userId: { type: String },
    items: [CartItemSchema],
}, {
    timestamps: true,
});

const Cart: Model<ICart> = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
