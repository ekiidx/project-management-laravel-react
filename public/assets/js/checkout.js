// // This is your test secret API key.
// const stripe = Stripe("");

// initialize();

// // Create a Checkout Session
// async function initialize() {
//   const fetchClientSecret = async () => {
//     const response = await fetch("/products", {
//       method: "POST",
//     });
//     const { clientSecret } = await response.json();
//     return clientSecret;
//   };

//   const checkout = await stripe.initEmbeddedCheckout({
//     fetchClientSecret,
//   });

//   // Mount Checkout
//   checkout.mount('#checkout');
// }