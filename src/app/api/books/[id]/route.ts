// src/app/api/books/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/lib/models/Book';

/**
 * GET /api/books/[id]
 * Returns a single book by ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = params;

        // Try to find by MongoDB _id first, then by custom id field
        let book = await Book.findById(id).lean();

        if (!book) {
            book = await Book.findOne({ id: id }).lean();
        }

        if (!book) {
            return NextResponse.json({
                success: false,
                error: 'Book not found',
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: book,
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching book:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch book',
            message: errorMessage,
        }, { status: 500 });
    }
}
