async function testFlow() {
  try {
    // 1. Login
    const loginRes = await fetch('http://localhost:3005/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'testuser@ecommerce.com', password: 'password123' })
    });
    const loginData = await loginRes.json();
    if (!loginRes.ok) throw new Error(loginData.message || 'Login failed');
    const token = loginData.token;
    console.log('✅ Logged in, got token:', token.substring(0, 20) + '...');

    // 2. Fetch products
    const productsRes = await fetch('http://localhost:3005/product/all', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const productsData = await productsRes.json();
    const products = productsData.products;
    console.log(`✅ Fetched ${products.length} products`);

    // 3. Add first product to cart
    const product = products[10];
    const cartRes = await fetch('http://localhost:3005/cart/add', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ item: { productId: product._id, quantity: 1 } })
    });
    const cartData = await cartRes.json();
    console.log('✅ Added to cart response:', cartData.message);
    console.log('📦 Post Response Cart items length:', cartData.cart ? cartData.cart.items.length : 'undefined');

    // 4. Fetch cart
    const getCartRes = await fetch('http://localhost:3005/cart/all', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const getCartData = await getCartRes.json();
    console.log('✅ Fetched cart:', JSON.stringify(getCartData.cart.items, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testFlow();
