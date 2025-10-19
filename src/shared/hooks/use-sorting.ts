import { useMemo, useState } from 'react';

type Direction = 'asc' | 'desc';

export function useSorting<T>(data: T[], defaultSort: string = '') {
  const [sortBy, setSortBy] = useState<string>(defaultSort);

  const sortedData = useMemo(() => {
    if (!sortBy) return data;

    const lastDash = sortBy.lastIndexOf('-');
    const field = lastDash > -1 ? sortBy.slice(0, lastDash) : sortBy;
    const direction: Direction =
      lastDash > -1 ? (sortBy.slice(lastDash + 1) as Direction) : 'asc';

    const indexed = data.map((item, idx) => ({ item, idx }));

    const collator = new Intl.Collator('pt-BR', {
      numeric: true,
      sensitivity: 'base', 
    });

    const getVal = (obj: any, path: string): any => {
      if (!path) return obj;
      return path.split('.').reduce((cur, key) => (cur == null ? cur : cur[key]), obj);
    };

    const compare = (a: any, b: any) => {
      const aU = a == null;
      const bU = b == null;
      if (aU && bU) return 0;
      if (aU) return 1;
      if (bU) return -1;

      if (a instanceof Date || b instanceof Date) {
        const aTime = a instanceof Date ? a.getTime() : new Date(a).getTime();
        const bTime = b instanceof Date ? b.getTime() : new Date(b).getTime();
        return aTime - bTime;
      }

      const aNum = typeof a === 'number' ? a : (isFinite(+a) ? +a : NaN);
      const bNum = typeof b === 'number' ? b : (isFinite(+b) ? +b : NaN);
      const bothNumbers = !Number.isNaN(aNum) && !Number.isNaN(bNum);
      if (bothNumbers) return aNum - bNum;

      return collator.compare(String(a), String(b));
    };

    indexed.sort((A, B) => {
      const aVal = getVal(A.item, field);
      const bVal = getVal(B.item, field);
      let cmp = compare(aVal, bVal);
      if (direction === 'desc') cmp = -cmp;

      return cmp || A.idx - B.idx;
    });

    return indexed.map(({ item }) => item);
  }, [data, sortBy]);

  return { sortedData, sortBy, setSortBy };
}
