import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  
export const SkeletonLoading = () => {
  return (
    <div className="min-h-screen space-y-2 mt-8">
      <div className="flex justify-between mb-7">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-10 w-36" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">שם</TableHead>
            <TableHead className="text-center">מקצוע</TableHead>
            <TableHead className="text-center">סכום</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-5 w-full" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-5 w-full" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-5 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>סה״כ הוצאות</TableCell>
            <TableCell className="text-red-500 text-center">
              <Skeleton className="h-5 w-full" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
