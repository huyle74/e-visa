import { SortOrder, Direction } from "@/services/admin/admin.dto";

interface Pagination {
  pageSize: number;
  currentPage: number;
  sortBy: "createAt" | "firstName" | "lastName";
  sortOrder: SortOrder;
}

export const paginationHelper = ({
  pageSize,
  currentPage,
  sortBy,
  sortOrder,
}: Pagination) => {
  const query: any = { orderBy: { [sortBy]: sortOrder }, take: pageSize };
  if (currentPage !== 1) {
    query.skip = (currentPage - 1) * pageSize;
  }

  return query;
};
