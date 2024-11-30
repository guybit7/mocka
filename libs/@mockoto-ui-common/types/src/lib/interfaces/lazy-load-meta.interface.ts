import { FilterMetadata } from './filter-metadata.interface';
import { SortMeta } from './sort-meta.interface';

export interface LazyLoadMeta {
  first?: number | undefined | null;
  rows?: number | undefined | null;
  sortField?: string | string[] | null | undefined;
  sortOrder?: number | undefined | null;
  filters?: { [s: string]: FilterMetadata | FilterMetadata[] | undefined };
  globalFilter?: string | null;
  multiSortMeta?: SortMeta[] | undefined | null;
  last?: number | undefined | null;
}
