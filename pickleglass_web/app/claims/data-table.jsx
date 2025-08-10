'use client';

import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, MoreHorizontal, FileText, Calendar, DollarSign, Building2, User, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case 'paid':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'denied':
      return <XCircle className="h-4 w-4 text-red-600" />;
    case 'pending':
    case 'processing':
    case 'submitted':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'partially_paid':
      return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    default:
      return <FileText className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusVariant = (status) => {
  switch (status?.toLowerCase()) {
    case 'paid':
      return 'default';
    case 'denied':
      return 'destructive';
    case 'pending':
    case 'processing':
    case 'submitted':
      return 'secondary';
    case 'partially_paid':
      return 'outline';
    default:
      return 'outline';
  }
};

const ProcedureRow = ({ procedure }) => (
  <div className="flex items-center justify-between py-1 text-sm">
    <div className="flex items-center space-x-3">
      <code className="bg-muted px-2 py-1 rounded text-xs font-mono">{procedure.cpt}</code>
      <span className="text-muted-foreground">×{procedure.units}</span>
      {procedure.dxCodes && procedure.dxCodes.length > 0 && (
        <span className="text-xs text-muted-foreground">
          {procedure.dxCodes.join(', ')}
        </span>
      )}
    </div>
    <span className="font-medium">${procedure.charge.toFixed(2)}</span>
  </div>
);

const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    accessorKey: 'id',
    header: 'Claim #',
    cell: ({ row }) => {
      const claim = row.original;
      return (
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium font-mono">{claim.id}</div>
            <div className="text-xs text-muted-foreground">
              {claim.dos ? new Date(claim.dos).toLocaleDateString() : 'No date'}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => {
      const claim = row.original;
      return (
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{claim.patient || 'Unknown Patient'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'insurance',
    header: 'Insurance',
    cell: ({ row }) => {
      const claim = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{claim.insurance || 'No insurance'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status');
      return (
        <div className="flex items-center space-x-2">
          {getStatusIcon(status)}
          <Badge variant={getStatusVariant(status)} className="capitalize">
            {status || 'unknown'}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'billed',
    header: () => <div className="text-right">Amounts</div>,
    cell: ({ row }) => {
      const claim = row.original;
      const billed = parseFloat(claim.billed || 0);
      const paid = parseFloat(claim.paid || 0);
      const denied = parseFloat(claim.denied || 0);
      
      return (
        <div className="text-right space-y-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Billed:</span>
            <span className="font-medium">${billed.toFixed(2)}</span>
          </div>
          {paid > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Paid:</span>
              <span className="font-medium text-green-600">${paid.toFixed(2)}</span>
            </div>
          )}
          {denied > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Denied:</span>
              <span className="font-medium text-red-600">${denied.toFixed(2)}</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: 'procedures',
    header: 'Procedures',
    cell: ({ row }) => {
      const claim = row.original;
      const procedures = claim.procedures || [];
      
      if (procedures.length === 0) {
        return <span className="text-muted-foreground text-sm">No procedures</span>;
      }

      if (procedures.length === 1) {
        return <ProcedureRow procedure={procedures[0]} />;
      }

      return (
        <Collapsible>
          <div className="space-y-1">
            <ProcedureRow procedure={procedures[0]} />
            {procedures.length > 1 && (
              <>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 text-xs text-muted-foreground">
                    +{procedures.length - 1} more
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  {procedures.slice(1).map((procedure, index) => (
                    <ProcedureRow key={index + 1} procedure={procedure} />
                  ))}
                </CollapsibleContent>
              </>
            )}
          </div>
        </Collapsible>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const claim = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit claim</DropdownMenuItem>
            <DropdownMenuItem>View documents</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Submit to insurance</DropdownMenuItem>
            <DropdownMenuItem>Create appeal</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function ClaimsDataTable({ data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, value) => {
      const claim = row.original;
      const searchValue = value.toLowerCase();
      return (
        claim.patient?.toLowerCase().includes(searchValue) ||
        claim.insurance?.toLowerCase().includes(searchValue) ||
        claim.status?.toLowerCase().includes(searchValue) ||
        claim.id?.toString().includes(searchValue) ||
        claim.procedures?.some(p => p.cpt?.toLowerCase().includes(searchValue))
      );
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search claims..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No claims found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
