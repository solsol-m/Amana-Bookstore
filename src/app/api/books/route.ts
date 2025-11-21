// src/app/api/books/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/lib/models/Book';

/**
 * GET /api/books
 * Returns all books from the database
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const books = await Book.find({}).lean();

    return NextResponse.json({
      success: true,
      count: books.length,
      data: books,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching books:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch books',
      message: error.message,
    }, { status: 500 });
  }
}