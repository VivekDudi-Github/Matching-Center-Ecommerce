import StoreCard from "@/app/components/admin/settings/StoreCard";
import ContactCard from "@/app/components/admin/settings/ContactCard";
import PaymentCard from "@/app/components/admin/settings/PaymentCard";
import ShippingCard from "@/app/components/admin/settings/ShippingCard";
import WebsiteCard from "@/app/components/admin/settings/WebsiteCard";
import SaveBar from "@/app/components/admin/settings/SaveBar";

export default function SettingsPage() {
  return (
    <div className="space-y-6">

      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Settings
        </h1>

        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          Manage your store information and website settings.
        </p>
      </div>

      {/* Cards */}

      <StoreCard />

      <ContactCard />

      <PaymentCard />

      <ShippingCard />

      <WebsiteCard />

      <SaveBar />

    </div>
  );
}