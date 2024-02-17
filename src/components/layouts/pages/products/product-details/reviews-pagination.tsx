import { Button } from '@/components/ui/button';
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination';

type ReviewsPaginationProps = {
  currentPage: number;
  onNextPageChange: () => void;
  onPreviosPageChange: () => void;
  hasNext: boolean;
  hasPrev: boolean;
};

export function ReviewsPagination({
  currentPage,
  onNextPageChange,
  onPreviosPageChange,
  hasNext,
  hasPrev,
}: ReviewsPaginationProps) {
  return (
    <PaginationContent>
      <PaginationItem>
        <Button
          variant="ghost"
          disabled={!hasPrev}
          onClick={onPreviosPageChange}
        >
          Prev
        </Button>
      </PaginationItem>
      {hasPrev && (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      )}
      <PaginationItem>{currentPage}</PaginationItem>

      {hasNext && (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      )}
      <PaginationItem>
        <Button variant="ghost" disabled={!hasNext} onClick={onNextPageChange}>
          Next
        </Button>
      </PaginationItem>
    </PaginationContent>
  );
}
