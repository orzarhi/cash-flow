'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface ResponsiveDialogProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description?: string;
  textCenter?: boolean;
}

export const ResponsiveDialog = ({
  children,
  isOpen,
  setIsOpen,
  title,
  description,
  textCenter,
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={cn(
            'sm:max-w-[600px] w-[95%] p-1 mt-5 rounded-md max-h-[80vh] overflow-y-auto',
            {
              'text-center': textCenter,
            }
          )}
        >
          <DialogHeader>
            <DialogTitle className="text-center">{title}</DialogTitle>
            {description && (
              <DialogDescription
                className={cn('!text-muted-foreground', {
                  'text-center': textCenter,
                })}
              >
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="">
        <DrawerHeader
          className={cn('text-left', {
            'text-center': textCenter,
          })}
        >
          <DrawerTitle>{title}</DrawerTitle>
          {description && (
            <DialogDescription className="text-muted-foreground">
              {description}
            </DialogDescription>
          )}
        </DrawerHeader>
        <div className="max-h-[70vh] overflow-y-auto p-2">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};
