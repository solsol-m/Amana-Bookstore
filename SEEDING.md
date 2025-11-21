# Database Seeding

This project includes a database seeding feature to populate MongoDB with initial data from JSON files.

## How to Seed the Database

### Method 1: Using the API Route (Recommended)

1. Make sure your Next.js server is running:
   ```bash
   npm run dev
   ```

2. Navigate to the seed endpoint in your browser or use curl:
   ```
   http://localhost:3000/api/seed
   ```

   Or using curl:
   ```bash
   curl http://localhost:3000/api/seed
   ```

### Method 2: Using a Script (Alternative)

You can also create a standalone Node.js script if needed.

## What the Seed Script Does

1. **Reads JSON files** from the `/data` directory:
   - `books.json` → books collection
   - `reviews.json` → reviews collection
   - `cart.json` → carts collection

2. **Clears existing data** from all collections (⚠️ WARNING: This deletes all current data!)

3. **Inserts new data** from the JSON files

4. **Returns statistics** about how many records were inserted

## Response Example

```json
{
  "success": true,
  "message": "Database seeded successfully",
  "stats": {
    "books": 45,
    "reviews": 60,
    "carts": 0
  }
}
```

## Important Notes

⚠️ **WARNING**: Running the seed script will **DELETE ALL EXISTING DATA** in your MongoDB database and replace it with data from the JSON files.

- Only use this in development or when you want to reset your database
- Consider adding authentication to the `/api/seed` route in production
- The script is safe to run multiple times (it's idempotent)

## Files Involved

- **Seed Logic**: `src/lib/seed.ts`
- **API Route**: `src/app/api/seed/route.ts`
- **Data Files**: 
  - `data/books.json`
  - `data/reviews.json`
  - `data/cart.json`

## Troubleshooting

If you encounter errors:

1. **Check MongoDB connection**: Ensure `MONGODB_URI` is set in `.env.local`
2. **Check JSON files**: Ensure they exist in the `data/` directory
3. **Check server logs**: Look at the terminal where `npm run dev` is running
4. **Verify mongoose is installed**: Run `npm list mongoose`
