const fs = require('fs');
const path = require('path');

// Read the TypeScript files
const booksContent = fs.readFileSync(path.join(__dirname, 'src/app/data/books.ts'), 'utf-8');
const reviewsContent = fs.readFileSync(path.join(__dirname, 'src/app/data/reviews.ts'), 'utf-8');
const cartContent = fs.readFileSync(path.join(__dirname, 'src/app/data/cart.ts'), 'utf-8');

// Extract the array data using regex
function extractArrayData(content, varName) {
  const regex = new RegExp(`export const ${varName}[^=]*=\\s*\\[([\\s\\S]*?)\\];`, 'm');
  const match = content.match(regex);
  if (match) {
    try {
      // Create a proper JavaScript object by wrapping in array brackets
      const arrayContent = '[' + match[1] + ']';
      // Use eval to convert the TypeScript/JavaScript object literals to actual objects
      // Note: eval is used here for simplicity in a controlled environment
      return eval('(' + arrayContent + ')');
    } catch (error) {
      console.error(`Error parsing ${varName}:`, error.message);
      return null;
    }
  }
  return null;
}

// Extract data
const books = extractArrayData(booksContent, 'books');
const reviews = extractArrayData(reviewsContent, 'reviews');
const initialCart = extractArrayData(cartContent, 'initialCart');

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Write JSON files
if (books) {
  fs.writeFileSync(
    path.join(dataDir, 'books.json'),
    JSON.stringify(books, null, 2),
    'utf-8'
  );
  console.log('✓ books.json created successfully');
}

if (reviews) {
  fs.writeFileSync(
    path.join(dataDir, 'reviews.json'),
    JSON.stringify(reviews, null, 2),
    'utf-8'
  );
  console.log('✓ reviews.json created successfully');
}

if (initialCart !== null) {
  fs.writeFileSync(
    path.join(dataDir, 'cart.json'),
    JSON.stringify(initialCart, null, 2),
    'utf-8'
  );
  console.log('✓ cart.json created successfully');
}

console.log('\nAll JSON files have been created in the data/ directory');
