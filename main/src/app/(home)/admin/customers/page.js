"use client";
import CustomerToolbar from "@/app/components/admin/customers/CustomerToolbar";
import CustomersTable from "@/app/components/admin/customers/CustomersTable";

const customers = [
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "9876543210",
    orders: 5,
    totalSpent: 12450,
    lastOrder: "08 Jul 2026",
  },
  {
    id: 2,
    name: "Priya Verma",
    phone: "9876543211",
    orders: 2,
    totalSpent: 3850,
    lastOrder: "07 Jul 2026",
  },
  {
    id: 3,
    name: "Amit Singh",
    phone: "9876543212",
    orders: 8,
    totalSpent: 28400,
    lastOrder: "05 Jul 2026",
  },
  {
    id: 4,
    name: "Neha Gupta",
    phone: "9876543213",
    orders: 1,
    totalSpent: 980,
    lastOrder: "04 Jul 2026",
  },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Customers
        </h1>

        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          View customers and their purchase history.
        </p>
      </div>

      {/* Toolbar */}

      <CustomerToolbar />

      {/* Table */}

      <CustomersTable customers={customers} />
    </div>
  );
}