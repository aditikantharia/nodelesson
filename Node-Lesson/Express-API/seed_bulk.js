const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productModel = require("./models/product.model");

dotenv.config();

const curatedProducts = {
  Electronics: [
    { name: "Laptop Pro", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80" },
    { name: "Smartphone X", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80" },
    { name: "Wireless Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80" },
    { name: "Smartwatch Ultra", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80" },
    { name: "DSLR Camera", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80" },
    { name: "Mechanical Keyboard", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=80" },
    { name: "Bluetooth Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80" },
    { name: "Tablet Air", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=900&q=80" }
  ],
  Home: [
    { name: "Modern Sofa", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80" },
    { name: "Dining Table", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=900&q=80" },
    { name: "Accent Chair", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80" },
    { name: "Floor Lamp", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?auto=format&fit=crop&w=900&q=80" },
    { name: "Queen Bed Frame", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80" },
    { name: "Persian Rug", image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=900&q=80" },
    { name: "Ceramic Vase", image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=900&q=80" }
  ],
  Fashion: [
    { name: "Classic T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80" },
    { name: "Denim Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80" },
    { name: "Leather Jacket", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80" },
    { name: "Running Sneakers", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80" },
    { name: "Aviator Sunglasses", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80" },
    { name: "Evening Dress", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=80" },
    { name: "Classic Watch", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80" },
    { name: "Tote Bag", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=900&q=80" }
  ],
  Beauty: [
    { name: "Matte Lipstick", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80" },
    { name: "Vitamin C Serum", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80" },
    { name: "Signature Perfume", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80" },
    { name: "Organic Shampoo", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=80" },
    { name: "Night Cream", image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=900&q=80" },
    { name: "Makeup Brush Set", image: "https://images.unsplash.com/photo-1512496015851-a1c848cb3b80?auto=format&fit=crop&w=900&q=80" },
    { name: "Liquid Eyeliner", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80" },
    { name: "Handmade Soap", image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=900&q=80" }
  ],
  Fitness: [
    { name: "Hex Dumbbell", image: "https://images.unsplash.com/photo-1586401700685-6111fba3d526?auto=format&fit=crop&w=900&q=80" },
    { name: "Yoga Mat", image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=900&q=80" },
    { name: "Kettlebell", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80" },
    { name: "Steel Water Bottle", image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80" },
    { name: "Gym Bag", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80" },
    { name: "Speed Jump Rope", image: "https://images.unsplash.com/photo-1515525547053-91b7d5102a0a?auto=format&fit=crop&w=900&q=80" },
    { name: "Fitness Tracker", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?auto=format&fit=crop&w=900&q=80" }
  ],
  Toys: [
    { name: "Building Blocks", image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=900&q=80" },
    { name: "RC Car", image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=900&q=80" },
    { name: "Teddy Bear", image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=80" },
    { name: "1000pc Puzzle", image: "https://images.unsplash.com/photo-1611080922896-bc71020bbaaf?auto=format&fit=crop&w=900&q=80" },
    { name: "Toy Robot", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80" },
    { name: "Soccer Ball", image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&w=900&q=80" },
    { name: "Board Game", image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?auto=format&fit=crop&w=900&q=80" }
  ]
};

const seedData = [];
let skuCounter = 1;

for (const [category, items] of Object.entries(curatedProducts)) {
  items.forEach((item) => {
    seedData.push({
      name: item.name,
      description: `High-quality ${item.name.toLowerCase()} for your everyday needs. Discover the best in ${category}.`,
      stock: Math.floor(Math.random() * 50) + 10,
      price: parseFloat(((Math.random() * 150) + 10).toFixed(2)),
      discount: Math.floor(Math.random() * 20),
      isNewproduct: Math.random() > 0.5,
      sku: `SKU-${category.toUpperCase().substring(0, 3)}-${skuCounter.toString().padStart(4, '0')}`,
      images: [item.image],
      brand: `${category}Brand`,
      category: category,
      rating: parseFloat(((Math.random() * 2) + 3).toFixed(1))
    });
    skuCounter++;
  });
}

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("📊 Mongodb Connected for Bulk Seeding");

    await productModel.deleteMany({});
    console.log("🧹 Cleared existing products");

    await productModel.insertMany(seedData);
    console.log(`✅ Successfully seeded ${seedData.length} products (7-8 per category) with curated images!`);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
