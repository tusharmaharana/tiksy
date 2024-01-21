import React, { CSSProperties, Fragment } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { cn } from '@/lib/utils';
import AppLoader from './AppLoader';
import { isNull, isUndefined } from 'lodash';

export interface IColumn {
	accessor: string;
	header?: string | React.ReactNode;
	minWidth?: number;
	maxWidth?: number;
	width?: number;
	className?: string;
}
interface IAppTable {
	data?: any;
	columns?: IColumn[];
	className?: any;
	onRowClick?: any;
	tableControls?: any;
}

export function AppTable(props: IAppTable) {
	const { data, columns, className, onRowClick, tableControls } = props;

	return (
		<div className={cn('w-full h-full border rounded overflow-auto', className)}>
			{tableControls}

			<Table>
				<TableHeader>
					<TableRow className='bg-violet-300 text-base hover:bg-violet-300'>
						{columns.map((col: any, i) => {
							const { width, minWidth, maxWidth } = col;
							const style: CSSProperties = {};
							if (width) {
								style.width = width;
							} else {
								style.minWidth = minWidth ?? 200;
								style.maxWidth = maxWidth ?? 200;
							}
							return (
								<TableHead className={cn('text-black', { 'text-right': i === columns.length - 1 }, col.className)} style={style}>
									{col.header}
								</TableHead>
							);
						})}
					</TableRow>
				</TableHeader>

				<TableBody>
					{data?.map((itemRow, i) => {
						return (
							<TableRow
								id={itemRow?.rowData?.id}
								className={cn(
									'hover:bg-violet-200',
									{ 'cursor-pointer': onRowClick },
									{ 'bg-violet-50': i % 2 !== 0 },
									itemRow.className
								)}
								onClick={() => onRowClick && onRowClick(itemRow.rowData)}
							>
								{columns.length
									? columns
											.filter((c) => !isNull(itemRow[c.accessor]) && !isUndefined(itemRow[c.accessor]))
											.map((col, j) => {
												const currentRowCell: any = itemRow?.[col?.accessor];
												const { width, minWidth, maxWidth } = col;
												const style: CSSProperties = {};
												if (width) {
													style.width = width;
												} else {
													style.minWidth = minWidth ?? 200;
													style.maxWidth = maxWidth ?? 200;
												}
												return (
													<TableCell
														className={cn('text-base', { 'text-right': j === columns.length - 1 }, col.className)}
														style={style}
													>
														{currentRowCell?.jsx ?? currentRowCell}
													</TableCell>
												);
											})
									: null}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}

export interface ITableCell {
	jsx: React.ReactNode;
	className?: string;
}

export interface ITableRow {
	[key: string]: any;
	rowData?: any;
	onRowClick?: any;
	className?: string;
}

export interface IAppTableBodyRow {
	columns: IColumn[];
	row: ITableRow;
	onRowClick: any;
}
