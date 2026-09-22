'use client';

import type { ReactElement } from 'react';
import { CreditCard, LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function PaymentRequiredDialog({ trigger }: { trigger: ReactElement }) {
  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent className="payment-dialog" showCloseButton={false}>
        <div className="payment-dialog-icon" aria-hidden="true">
          <LockKeyhole />
        </div>
        <DialogHeader>
          <DialogTitle>Conteúdo exclusivo do Workout</DialogTitle>
          <DialogDescription>
            Para abrir esta aula, conclui o pagamento do Workout. Depois da
            confirmação, todos os treinos ficam desbloqueados na tua conta.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button className="payment-dialog-button" />}>
            <CreditCard /> Entendi
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
