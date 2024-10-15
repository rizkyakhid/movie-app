interface IPaginationProps {
  currentPage?: number;
  handlePage?: (page: number) => void;
  totalPages?: number;
}

export default function Pagination({
  currentPage,
  handlePage,
  totalPages,
}: IPaginationProps) {
  return (
    <div id="pagination-component" className="flex gap-4 justify-end">
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <div
        className={`${
          currentPage === 1 ? "text-neutral-400" : "cursor-pointer"
        }`}
        onClick={() => {
          if (currentPage && handlePage) {
            handlePage(currentPage - 1);
          }
        }}
      >
        PREV
      </div>
      <div
        className={`${
          currentPage === totalPages ? "text-neutral-400" : "cursor-pointer"
        }`}
        onClick={() => {
          if (currentPage && handlePage) {
            handlePage(currentPage + 1);
          }
        }}
      >
        NEXT
      </div>
    </div>
  );
}
