/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FieldError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CreateMilestone } from '@/lib/validation';

interface DatePickerProps {
  className?: string;
  setValue: UseFormSetValue<CreateMilestone>;     
  watch: UseFormWatch<CreateMilestone>;
  errors: { [x: string]: FieldError | any };
}

export const DatePicker = ({ className, setValue, watch, errors }: DatePickerProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const watchDate = watch('date');

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setValue('date', date, { shouldValidate: true });
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(className, !watchDate && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 size-4" />
          {watchDate ? format(watchDate, 'dd/MM/yyyy') : <span>בחר תאריך</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={watchDate}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
      {errors.dueDate && <p className="error_message">{errors.date.message}</p>}
    </Popover>
  );
};
