"use client";

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "../../../components/ui/dialog";
import { useSubscriptionModal } from "../store/use-subscription-modal";

export const SubscriptionModal = () => {
  const { isOpen, onClose } = useSubscriptionModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Hello</DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
