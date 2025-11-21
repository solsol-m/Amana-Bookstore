// src/app/api/seed/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

/**
 * GET /api/seed
 * Seeds the database with data from JSON files
 * WARNING: This will clear all existing data and replace it with data from JSON files
 */
export async function GET(request: NextRequest) {
    try {
        // Optional: Add authentication check here to prevent unauthorized seeding
        // For development purposes, we'll allow it without auth

        console.log('📡 Seed API route called');

        const result = await seedDatabase();

        return NextResponse.json({
            success: true,
            message: result.message,
            stats: result.stats,
        }, { status: 200 });

    } catch (error: any) {
        console.error('Error in seed API route:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to seed database',
            message: error.message,
        }, { status: 500 });
    }
}

/**
 * POST /api/seed
 * Alternative method to seed the database
 */
export async function POST(request: NextRequest) {
    return GET(request);
}
