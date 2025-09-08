/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51S3IdSLTEuZx7stWg4Q7sA6bQ0jP2hWHMb3QaSnjMKydoWF7veO2FgEFVxOx5BzKm5SY2oyILitM9L2qyqfxaA0E00L9MgxaIt',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form and charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
