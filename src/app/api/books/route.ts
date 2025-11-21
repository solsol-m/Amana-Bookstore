// src/app/api/books/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/lib/models/Book';

/**
 * GET /api/books
 * Returns all books from the database
 */
export async function GET() {
  try {
    await connectDB();

    const books = await Book.find({}).lean();

    return NextResponse.json({
      success: true,
      count: books.length,
      data: books,
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching books:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch books',
      message: errorMessage,
    }, { status: 500 });
  }
}