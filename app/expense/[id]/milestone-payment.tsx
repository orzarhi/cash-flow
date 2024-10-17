'use client';

import { DatePicker } from '@/components/date-picker';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PAYMENT } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

const LABEL_MAP: Record<PAYMENT, string> = {
  CASH: 'מזומן',
  CARD: 'כרטיס אשראי',
  CHECK: "צ'ק",
  TRANSFER: 'העברה בנקאית',
  OTHER: 'אחר',
};

interface MilestonePaymentProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const MilestonePayment = ({ openModal, setOpenModal }: MilestonePaymentProps) => {
  return (
    <ResponsiveDialog
      isOpen={openModal}
      setIsOpen={setOpenModal}
      title="הוספת מפרעה חדשה"
    >
      <form className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="title" className="font-semibold">
            שם
          </Label>
          <Input
            type="text"
            id="title"
            placeholder="מלא את שם המפרעה (לדוגמה: מפרעה ראשונה)"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="amount" className="font-semibold">
            סכום
          </Label>
          <Input
            type="number"
            id="amount"
            inputMode="numeric"
            placeholder="מלא את סכום המפרעה (בשקלים)"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="paymentType" className="font-semibold">
            אופן תשלום
          </Label>
          <Select dir='rtl'>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="בחר אופן תשלום" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(LABEL_MAP).map((type) => (
                <SelectItem key={type} value={type}>
                  {LABEL_MAP[type as PAYMENT]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="date" className="font-semibold">
            תאריך
          </Label>
          <DatePicker className="w-full justify-start text-left font-normal" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="note" className="font-semibold">
            הערה
          </Label>
          <Textarea
            id="note"
            placeholder="מלא את הערה (אופציונלי)"
          />
        </div>

        <div className="flex justify-start">
          <Button type="submit">
            הוסף מפרעה
          </Button>
        </div>
      </form>
    </ResponsiveDialog>
  );
};
