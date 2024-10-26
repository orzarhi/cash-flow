import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Loader2 className="size-12 my-2 animate-spin text-muted-foreground" />
      <p>עוד רגע...</p>
    </div>
  );
}
