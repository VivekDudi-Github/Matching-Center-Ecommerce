import OrderToolbar from "@/app/components/admin/orders/OrdersToolbar";
import OrdersTable from "@/app/components/admin/orders/OrdersTable";

const orders = [
  {
    id: "#1001",
    customer: "Rahul Sharma",
    phone: "9876543210",
    amount: 3250,
    payment: "Paid",
    status: "Pending",
    date: "08 Jul 2026",
  },
  {
    id: "#1002",
    customer: "Priya Verma",
    phone: "9876543211",
    amount: 1850,
    payment: "Paid",
    status: "Processing",
    date: "08 Jul 2026",
  },
  {
    id: "#1003",
    customer: "Amit Singh",
    phone: "9876543212",
    amount: 6200,
    payment: "Paid",
    status: "Shipped",
    date: "07 Jul 2026",
  },
  {
    id: "#1004",
    customer: "Neha Gupta",
    phone: "9876543213",
    amount: 980,
    payment: "COD",
    status: "Delivered",
    date: "06 Jul 2026",
  },
  {
    id: "#1005",
    customer: "Vikas Jain",
    phone: "9876543214",
    amount: 1420,
    payment: "Paid",
    status: "Cancelled",
    date: "05 Jul 2026",
  },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Orders
        </h1>

        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          View and manage customer orders.
        </p>
      </div>

      {/* Toolbar */}

      <OrderToolbar />

      {/* Table */}

      <OrdersTable orders={orders} />
    </div>
  );
}