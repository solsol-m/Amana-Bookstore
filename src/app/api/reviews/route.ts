// src/app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/lib/models/Review';

/**
 * GET /api/reviews
 * Returns all reviews from the database
 * Optional query parameter: bookId to filter reviews by book
 */
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        // Get bookId from query parameters if provided
        const { searchParams } = new URL(request.url);
        const bookId = searchParams.get('bookId');

        let reviews;
        if (bookId) {
            // Filter reviews by bookId if provided
            reviews = await Review.find({ bookId }).lean();
        } else {
            // Return all reviews
            reviews = await Review.find({}).lean();
        }

        return NextResponse.json({
            success: true,
            count: reviews.length,
            data: reviews,
        }, { status: 200 });

    } catch (error: any) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch reviews',
            message: error.message,
        }, { status: 500 });
    }
}
