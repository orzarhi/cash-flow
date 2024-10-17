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
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
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
          className={cn('sm:max-w-[525px]', {
            'text-center': textCenter,
          })}
        >
          <DialogHeader>
            <DialogTitle
              className={cn('', {
                'text-center': textCenter,
              })}
            >
              {title}
            </DialogTitle>
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
      <DrawerContent>
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
        <div className="p-2">{children}</div>
        <DrawerFooter className="pt-2">
          {/* <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
