// src/app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Cart from '@/lib/models/Cart';

/**
 * GET /api/cart
 * Returns all carts from the database
 * Optional query parameter: userId to filter cart by user
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get userId from query parameters if provided
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let carts;
    if (userId) {
      // Filter cart by userId if provided
      carts = await Cart.find({ userId }).lean();
    } else {
      // Return all carts
      carts = await Cart.find({}).lean();
    }

    return NextResponse.json({
      success: true,
      count: carts.length,
      data: carts,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching carts:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch carts',
      message: error.message,
    }, { status: 500 });
  }
}