'use client';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useState } from 'react';

interface CollapsibleDescriptionProps {
  description: string | null;
}

export const CollapsibleDescription = ({ description }: CollapsibleDescriptionProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  if (!description) {
    return (
      <div className="flex justify-between">
        <h2>הערות:</h2>
        <p>לא קיימות הערות</p>
      </div>
    );
  }

  if (description.length <= 10) {
    return (
      <div className="flex justify-between">
        <h2>הערות:</h2>
        <p>{description}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between">
        <h2>הערות:</h2>
        <p
          className="truncate cursor-pointer w-36 sm:w-48"
          onClick={() => setModalOpen(true)}
        >
          {description}
        </p>
      </div>
      <ResponsiveDialog isOpen={modalOpen} textCenter={true} setIsOpen={setModalOpen}>
        <p>{description}</p>
      </ResponsiveDialog>
    </>
  );
};
