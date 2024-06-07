import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Checkbox } from '@mui/material';
import { useTodoContext } from '../context/TodoContext';
import TodoMenu from './TodoMenu';

const columns = [
  { id: 'complete', label: 'Complete', minWidth: 100 },
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' },
];

const StickyHeadTable: React.FC = () => {
  const {
    meta,
    todos,
    handleUpdate: onUpdate,
    filter,
    loadTodos,
  } = useTodoContext();

  const [page, setPage] = React.useState(meta.current_page - 1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
    loadTodos(newPage + 1, filter);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    loadTodos(1, filter);
  };

  return (
    <>
      {todos.length > 0 ? (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer
            sx={{
              height: 840,
              width: '100%',
              minWidth: 1200,
              maxWidth: 1200,
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {todos
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(todo => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={todo.id}
                        className={todo.is_completed ? 'opacity-50' : ''}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={todo.is_completed}
                            onChange={() =>
                              onUpdate({
                                id: todo.id,
                                is_completed: !todo.is_completed,
                              })
                            }
                            inputProps={{
                              'aria-label': 'select all desserts',
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <p
                            className={todo.is_completed ? 'line-through' : ''}
                          >
                            {todo.title}
                          </p>
                        </TableCell>
                        <TableCell>{todo.description}</TableCell>
                        <TableCell align="center">
                          <TodoMenu todo={todo} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 15]}
            component="div"
            count={meta.total_count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <p className="text-center text-gray-500">No todos available</p>
      )}
    </>
  );
};

export default StickyHeadTable;
