/**
 * 分页元数据
 */
export interface IPaginationMeta {
  /** 每页显示的数据个数 => perPage */
  limit: number
  /** 当前页显示的数据个数 itemCount */
  pageRecords: number
  /** 数据总数 => totalItems */
  totalRecords: number
  /** 当前页数 */
  page: number
  /** 总页数 */
  totalPages: number
}

/**
 * 分页选项
 */
export interface IPaginationOptions {
  /** 当前页数 */
  page: number
  /** 每页显示的数据个数 */
  limit: number
}

/**
 * 分页返回的数据
 */
export interface IPaginationReturn<E extends Record<string, any>> {
  meta: IPaginationMeta
  records: E[]
}
