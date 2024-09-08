"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NewPatientForm } from "@/components/PatientComponents/NewPatientForm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Patient } from "@/types";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTablePagination } from "@/components/Table/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import DeletePatient from "@/components/PatientComponents/DeletePatient";
import EditPatient from "@/components/PatientComponents/EditPatient";
import DeletePatients from "@/components/PatientComponents/DeletePatients";
import { useState, useEffect, useCallback } from "react";

const DateTimeCell: React.FC<{ dateTime: string }> = ({ dateTime }) => {
  const [formattedDate, setFormattedDate] = React.useState<string>("");

  React.useEffect(() => {
    setFormattedDate(new Date(dateTime).toLocaleString());
  }, [dateTime]);

  return <div>{formattedDate}</div>;
};

interface TableProps {
  patients: Patient[];
}

export function Tablee({ patients }: TableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [selectedPatients, setSelectedPatients] = React.useState<Patient[]>([]);

  const router = useRouter();

  const sortedPatients = React.useMemo(() => {
    return [...patients].sort((a, b) => {
      return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
    });
  }, [patients]);

  const columns = React.useMemo<ColumnDef<Patient>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
      },
      {
        accessorKey: "age",
        header: "Age",
        cell: ({ row }) => <div>{row.getValue("age")}</div>,
      },
      {
        accessorKey: "sex",
        header: "Sex",
        cell: ({ row }) => <div>{row.getValue("sex")}</div>,
      },
      {
        accessorKey: "contact",
        header: "Contact",
        cell: ({ row }) => <div>{row.getValue("contact")}</div>,
      },
      {
        accessorKey: "dateTime",
        header: "Date & Time",
        cell: ({ row }) => <DateTimeCell dateTime={row.getValue("dateTime")} />,
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const patient = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <EditPatient patient={patient} onClose={() => {}} />
                <DeletePatient patient={patient} onClose={() => {}} />
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: sortedPatients,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as string;
      return value.toLowerCase().includes(filterValue.toLowerCase());
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const updateSelectedPatients = useCallback(() => {
    const selected = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original);
    setSelectedPatients(selected);
  }, [table]);

  useEffect(() => {
    updateSelectedPatients();
  }, [updateSelectedPatients, table.getState().rowSelection]);

  const resetFilters = () => {
    setGlobalFilter("");
    table.resetColumnFilters();
  };

  const handleDeleteSelected = () => {
    setRowSelection({});
    setSelectedPatients([]);
    // You might want to refresh the patients list here
    // For example: refetchPatients();
  };

  const isFiltered =
    globalFilter !== "" || table.getState().columnFilters.length > 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search by name or contact..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={resetFilters}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <NewPatientForm />
          <DeletePatients
            selectedPatients={selectedPatients}
            onDelete={handleDeleteSelected}
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.id === "name" ? (
                        <Link href={`/patients/${row.original.id}`}>
                          <span className="cursor-pointer text-[#00F7F7] hover:underline">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </span>
                        </Link>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
}
