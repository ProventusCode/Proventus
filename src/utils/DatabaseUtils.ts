import { Column, getTableColumns, SQL, sql, Table } from "drizzle-orm";
import { PgTable, PgUpdateSetSource } from "drizzle-orm/pg-core";

export type IGNORED_COLUMNS = "id" | "createdAt" | "updatedAt";

export class DatabaseUtils {
  static readonly TIME_COLUMNS: IGNORED_COLUMNS[] = ["createdAt", "updatedAt"];
  static readonly DEFAULT_IGNORED_COLUMNS: IGNORED_COLUMNS[] = [
    "id",
    ...this.TIME_COLUMNS,
  ];

  /**
   * Update all the rows except for the ones defined in the second argument
   *
   * https://github.com/drizzle-team/drizzle-orm/issues/1728
   * @param table  The table to update
   * @param except The columns to exclude
   * @returns The columns to update
   */
  static conflictUpdateAllExcept<
    T extends Table,
    E extends (keyof T["$inferInsert"])[]
  >(table: T, except: E) {
    const columns = getTableColumns(table);
    const updateColumns = Object.entries(columns).filter(
      ([col]) => !except.includes(col as keyof typeof table.$inferInsert)
    );
    const result = updateColumns.reduce(
      (acc, [colName, table]) => ({
        ...acc,
        [colName]: sql.raw(`excluded.${table.name}`),
      }),
      {}
    ) as Omit<Record<keyof typeof table.$inferInsert, SQL>, E[number]>;
    return result;
  }

  /**
   * Update only the columns defined in the second argument
   * @param table   The table to update
   * @param columns The columns to update
   * @returns The columns to update
   */
  static conflictUpdateOnly<TTable extends PgTable>(
    table: TTable,
    columns: (keyof TTable["_"]["columns"] & keyof TTable)[]
  ): PgUpdateSetSource<TTable> {
    return Object.assign(
      {},
      ...columns.map((k) => ({
        [k]: sql.raw(`excluded.${(table[k] as Column).name}`),
      }))
    ) as PgUpdateSetSource<TTable>;
  }
}
