// src/lib/seed.ts
import fs from 'fs';
import path from 'path';
import connectDB from './mongodb';
import Book from './models/Book';
import Review from './models/Review';
import Cart from './models/Cart';

export async function seedDatabase() {
    try {
        // Connect to MongoDB
        await connectDB();

        console.log('🌱 Starting database seeding...');

        // Read JSON files from the data directory
        const dataDir = path.join(process.cwd(), 'data');

        const booksData = JSON.parse(
            fs.readFileSync(path.join(dataDir, 'books.json'), 'utf-8')
        );

        const reviewsData = JSON.parse(
            fs.readFileSync(path.join(dataDir, 'reviews.json'), 'utf-8')
        );

        const cartData = JSON.parse(
            fs.readFileSync(path.join(dataDir, 'cart.json'), 'utf-8')
        );

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await Book.deleteMany({});
        await Review.deleteMany({});
        await Cart.deleteMany({});

        // Insert books
        console.log('📚 Inserting books...');
        const insertedBooks = await Book.insertMany(booksData);
        console.log(`✅ Inserted ${insertedBooks.length} books`);

        // Insert reviews
        console.log('⭐ Inserting reviews...');
        const insertedReviews = await Review.insertMany(reviewsData);
        console.log(`✅ Inserted ${insertedReviews.length} reviews`);

        // Insert cart items (if any)
        console.log('🛒 Inserting cart items...');
        let insertedCarts = [];
        if (Array.isArray(cartData) && cartData.length > 0) {
            insertedCarts = await Cart.insertMany(cartData);
            console.log(`✅ Inserted ${insertedCarts.length} cart items`);
        } else {
            console.log(`ℹ️  No cart items to insert (empty array)`);
        }

        console.log('🎉 Database seeding completed successfully!');

        return {
            success: true,
            message: 'Database seeded successfully',
            stats: {
                books: insertedBooks.length,
                reviews: insertedReviews.length,
                carts: insertedCarts.length,
            },
        };
    } catch (error: any) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
}
