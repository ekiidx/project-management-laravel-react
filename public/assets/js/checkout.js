// This is your test secret API key.
const stripe = Stripe("pk_test_51JMHhJC25ihSyzVGVSi294DyUrdjojghqkruqlA7mRh64CBBGOjaGgpasjazzcxBV72cZTQINld5mpvD4LTG2KTc001I3z1c9o");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/products", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}