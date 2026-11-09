import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { EmptyState } from './EmptyState';
import { Spinner } from './Spinner';

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  /** Custom cell renderer; defaults to `row[key]`. */
  render?: (row: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  loading?: boolean;
  striped?: boolean;
  compact?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  caption?: string;
  className?: string;
}

const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' } as const;

export function Table<T>({
  columns,
  data,
  rowKey,
  loading = false,
  striped = false,
  compact = false,
  emptyTitle = 'No records',
  emptyDescription = 'There is nothing to show here yet.',
  caption,
  className,
}: TableProps<T>) {
  const cellPad = compact ? 'px-4 py-2' : 'px-4 py-3';

  return (
    <div className={cn('min-w-0 max-w-full overflow-hidden rounded-xl border border-neutral-200 bg-surface', className)}>
      {/* Horizontal scroll keeps wide tables usable on narrow screens. */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="bg-surface-muted">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    cellPad,
                    'border-b border-neutral-200 text-xs font-semibold uppercase tracking-wide text-neutral-500',
                    alignClass[col.align ?? 'left'],
                    col.className,
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-primary-600">
                  <Spinner />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState compact title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={rowKey(row)}
                  className={cn(
                    'border-b border-neutral-100 last:border-0 hover:bg-primary-50/40',
                    striped && 'even:bg-surface-muted',
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(cellPad, 'text-neutral-700', alignClass[col.align ?? 'left'], col.className)}
                    >
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
