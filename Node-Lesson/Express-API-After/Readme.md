## Express Folder Structure:

├── config/ 🔧 Settings (DB connection, env vars, logger)
├── models/ 🗃️ Database table shapes (Mongoose schemas)
├── middlewares/ 🚦 Code that runs BEFORE your handler (auth, validation, rate-limit)
├── routes/ 🗺️ URL → handler mapping (what URL calls what function)
├── controllers/ 📬 Receives the HTTP request, sends the HTTP response
├── services/ 🧠 The actual business logic (talks to the DB)
└── utils/ 🔨 Reusable helpers (ApiError, ApiResponse, catchAsync)

## API Creation Rule:

Request → Route → (Middleware) → Controller → Service → Database
↓
Response ←────────────────────────────────── Controller ←─

## Data Flow :

1. Request arrives at Express
   ↓
2. app.js runs Helmet (security headers)
   ↓
3. app.js runs CORS check (is this origin allowed?)
   ↓
4. app.js runs Rate Limiter (has this IP sent too many requests?)
   ↓
5. Route matched: POST /api/v1/products → product.route.js
   ↓
6. validate(createProductSchema) middleware runs:
   ✅ "name" is a string ✓
   ✅ "price" is a number ✓
   → req.body is now safe, typed data
   ↓
7. productController.createProduct() runs
   ↓
8. ProductService.createProduct(req.body) is called
   ↓
9. MongoDB saves the document
   ↓
10. Controller sends: 201 { success: true, data: { ... }, message: "Product created" }


## Tasks:
1. show all user ✅
2. delete user ✅
3. add product ✅
4. update product ✅
5. delete product ✅

6. hide product 


7. create manager ✅
8. update manager   ✅

9. chatbot 
(chatbot: router --> service --> controller)

10. manage manager activity
11. forget password
12. special offers
