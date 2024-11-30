/**
 * Filters and sorts an array of objects based on a global search term, sort field, and sort order.
 * @param data The data to filter and sort.
 * @param searchTerm The global search term to filter by.
 * @param sortField The field by which to sort the data.
 * @param sortOrder The order in which to sort the data (1 for ascending, -1 for descending).
 * @returns A filtered and sorted array of objects.
 */
export function globalSearch<T extends { [key: string]: any }>(
  data: T[],
  searchTerm: string,
  sortField: string | null,
  sortOrder: number
): any[] {
  // Step 1: Filter the data based on the search term
  const filteredData = !searchTerm
    ? data // If no search term, return original data
    : data.filter((item: T) => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return Object.values(item).some(value => String(value).toLowerCase().includes(lowercasedSearchTerm));
      });

  // Step 2: Sort the filtered data based on sortField and sortOrder
  if (sortField) {
    return filteredData.sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      // Handle undefined values by treating them as less than any defined value
      if (valueA === undefined) return sortOrder === 1 ? -1 : 1;
      if (valueB === undefined) return sortOrder === 1 ? 1 : -1;

      // Compare values based on the sort order
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        // If values are strings, compare alphabetically
        const comparison = valueA.localeCompare(valueB);
        return sortOrder === 1 ? comparison : -comparison;
      } else {
        // For numeric or other types, use simple comparison
        return (valueA - valueB) * sortOrder;
      }
    });
  }

  // If no sorting criteria, just return the filtered data
  return filteredData;
}
