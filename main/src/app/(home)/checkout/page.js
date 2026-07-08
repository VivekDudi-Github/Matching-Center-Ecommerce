import CustomerDetailsCard from "@/app/components/checkout/CustomerDetails";
import OrderSummary from "@/app/components/checkout/OrderSummary";

const CART = [
  {
    id: 1,
    name: "Premium Cotton White",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500",
    price: 280,
    quantity: 2.5,
    color: "White",
    width: '44"',
  },
  {
    id: 2,
    name: "Printed Rayon Floral",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500",
    price: 340,
    quantity: 4,
    color: "Blue",
    width: '44"',
  },
  {
    id: 3,
    name: "Linen Blend Premium",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500",
    price: 420,
    quantity: 3,
    color: "Beige",
    width: '44"',
  },
];

export default function CheckoutPage() {
  const subtotal = CART.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 2000 ? 0 : 80;

  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-10">
        {/* Heading */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Checkout
          </h1>

          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Fill in your details and review your order before placing it.
          </p>
        </div>

        {/* Layout */}

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Customer Details */}

          <div className="lg:col-span-7">
            <CustomerDetailsCard />
          </div>

          {/* Order Summary */}

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <OrderSummary
                items={CART}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}