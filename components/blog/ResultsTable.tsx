export type ResultsRow = {
  cells: string[];
  /** Highlights the row as the winning/chosen configuration. */
  win?: boolean;
};

type ResultsTableProps = {
  columns: string[];
  rows: ResultsRow[];
};

export default function ResultsTable({ columns, rows }: ResultsTableProps) {
  return (
    <div className="my-5 overflow-x-auto">
      <table className="w-full border-collapse text-sm tabular-nums">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="border-b border-border px-2.5 py-2 text-left font-mono text-[10.5px] uppercase tracking-wide text-fg-muted"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={row.win ? "font-semibold text-accent-ink" : undefined}>
              {row.cells.map((cell, j) => (
                <td
                  key={j}
                  className="border-b border-border px-2.5 py-2 text-left"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
