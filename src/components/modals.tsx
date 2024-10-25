"use client";

import { useEffect, useState } from "react";
import { SubscriptionModal } from "../features/subscriptions/components/subscription-modal";
import { FailModal } from "../features/subscriptions/components/fail-modal";
import { SuccessModal } from "../features/subscriptions/components/success-modal";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <FailModal />
      <SubscriptionModal />
      <SuccessModal />
    </>
  );
};
