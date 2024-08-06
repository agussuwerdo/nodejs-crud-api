export interface Item {
  id?: string;
  name: string;
  price: number;
}

export interface PaginatedItemsResponse {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
  items: Item[];
}

export interface ResponseMessage {
  message: string;
  id?: string;
}
