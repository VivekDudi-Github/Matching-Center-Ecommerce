"use client";

import { useEffect, useState } from "react";
import * as Ably from "ably";

export default function CustomerNotifications({ customerId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!customerId) return;

    const client = new Ably.Realtime({
      authUrl: "/api/ably/token",
    });

    const channel = client.channels.get(
      `customer:${customerId}:notifications`
    );

    const handleMessage = (message) => {
      if (message.name !== "notification") return;

      setNotifications((previous) => [
        {
          id: message.id ?? `${Date.now()}-${Math.random()}`,
          ...message.data,
        },
        ...previous,
      ]);
    };

    channel.subscribe("notification", handleMessage);

    return () => {
      channel.unsubscribe("notification", handleMessage);
      client.close();
    };
  }, [customerId]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          role="status"
          className="rounded-xl border border-red-200 bg-white p-4 shadow-lg"
        >
          <p className="text-sm font-semibold text-gray-900">
            Order notification
          </p>

          <p className="mt-1 text-sm text-gray-700">
            {notification.message}
          </p>
        </div>
      ))}
    </div>
  );
}