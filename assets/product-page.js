// product-page.ts

// Import the Shopify Buy SDK
import ShopifyBuy from 'shopify-buy';

// Initialize the Shopify Buy SDK
const client = ShopifyBuy.buildClient({
  domain: 'your-shop-name.myshopify.com',
  storefrontAccessToken: 'your-storefront-access-token',
});

// Function to add a product to the cart
const addToCart = (variantId: string, quantity: number) => {
  return client.checkout.create().then((checkout) => {
    const lineItemsToAdd = [{
      variantId,
      quantity,
    }];

    return client.checkout.addLineItems(checkout.id, lineItemsToAdd);
  });
};

// Event listener for adding a product to the cart
document.addEventListener('click', (event) => {
  const addToCartButton = event.target as HTMLElement;

  // Check if the clicked element is the add to cart button
  if (addToCartButton.classList.contains('add-to-cart-button')) {
    const variantId = addToCartButton.dataset.variantId;
    const quantity = 1; // You can customize the quantity if needed

    // Add the product to the cart
    addToCart(variantId, quantity).then((updatedCheckout) => {
      // Update the cart count in the UI (you can customize this part)
      const cartCountElement = document.getElementById('cart-count');
      if (cartCountElement) {
        cartCountElement.innerText = updatedCheckout.lineItems.length.toString();
      }

      // Optionally, you can display a confirmation message or update the UI
      alert('Product added to cart!');
    });
  }
});
