import Stripe from "stripe";
import { getData } from "@//lib/db";

export async function handlecheckoutsessioncompleted({ session, stripe }: { session: Stripe.Checkout.Session, stripe: Stripe }) {
  // Fix the customer ID extraction
  let customerId: string;
  if (typeof session.customer === 'string') {
    customerId = session.customer;
  } else if (session.customer && typeof session.customer === 'object' && 'id' in session.customer) {
    customerId = session.customer.id;
  } else {
    console.error('Invalid customer format in session:', session.customer);
    throw new Error('Invalid customer format in checkout session');
  }
  
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0].price?.id;

  if ('email' in customer && priceId) {
    const { email, name } = customer;
    const sql = await getData();

    await Createandupdateuser({
      email: email as string,
      full_name: name as string,
      customer_id: customerId,
      price_id: priceId as string,
      status: 'active'
    });

    await createPayment({
      session,
      priceId: priceId as string,
      userEmail: email as string
    });
  }
}

async function Createandupdateuser({
  email,
  full_name,
  customer_id,
  price_id,
  status
}: {
  email: string;
  full_name: string;
  customer_id: string;
  price_id: string;
  status: string;
}) {
  try {
    const sql = await getData();
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
      const result = await sql`INSERT INTO users (email, full_name, customer_id, price_id, status) VALUES (${email}, ${full_name}, ${customer_id}, ${price_id}, ${status})`;
      console.log('User created:', result);
      return result;
    } else {
      const result = await sql`UPDATE users SET full_name = ${full_name}, customer_id = ${customer_id}, price_id = ${price_id}, status = ${status} WHERE email = ${email}`;
      console.log('User updated:', result);
      return result;
    }
  } catch (err) {
    console.error('Error creating or updating user:', err);
    throw err;
  }
}

async function createPayment({
  session,
  priceId,
  userEmail
}: {
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
}) {
  try {
    const sql = await getData();
    const { amount_total, id, status } = session;
    console.log('Creating payment record:', {
      amount: amount_total,
      status,
      stripe_payment_id: id,
      price_id: priceId,
      user_email: userEmail
    });
    const result = await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) VALUES (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail})`;
    console.log('Payment record created:', result);
    return result;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}