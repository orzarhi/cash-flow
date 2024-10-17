'use client';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import React, { useState } from 'react';

interface CollapsibleDescriptionProps {
  description: string | null;
}

export const CollapsibleDescription = ({ description }: CollapsibleDescriptionProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-medium">הערות:</h2>
        {description ? (
          <p
            className="truncate cursor-pointer w-36 sm:w-48"
            onClick={() => setModalOpen(true)}
          >
            {description ?? 'לא קיימות הערות'}
          </p>
        ) : (
          <p>לא קיימות הערות</p>
        )}
      </div>
      <ResponsiveDialog isOpen={modalOpen} textCenter={true} setIsOpen={setModalOpen}>
        <p>{description}</p>
      </ResponsiveDialog>
    </>
  );
};
