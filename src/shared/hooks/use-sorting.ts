import { useMemo, useState } from 'react';

export function useSorting<T>(data: T[], defaultSort: string = '') {
  const [sortBy, setSortBy] = useState<string>(defaultSort);

  const sortedData = useMemo(() => {
    if (!sortBy) return data;

    const sorted = [...data];
    const [field, direction] = sortBy.split('-');

    return sorted.sort((a, b) => {
      const aValue = getNestedValue(a, field);
      const bValue = getNestedValue(b, field);

      let comparison = 0;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return direction === 'desc' ? -comparison : comparison;
    });
  }, [data, sortBy]);

  return {
    sortedData,
    sortBy,
    setSortBy,
  };
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current?.[key];
  }, obj);
}
