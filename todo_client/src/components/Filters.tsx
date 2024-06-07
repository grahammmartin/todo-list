import { FILTERS } from '../utils/filters';
import { Filter } from '../types/filter';
import { useTodoContext } from '../context/TodoContext';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const Filters = () => {
  const { filter, setFilter } = useTodoContext();

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as Filter);
  };

  return (
    <div className="w-full flex justify-end">
      <FormControl sx={{ marginBottom: 1, minWidth: 80 }} className="m-0">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          onChange={handleFilterChange}
          className="bg-white m-0"
          sx={{
            '.MuiFormControl-root': {
              margin: '0px',
            },
          }}
        >
          {FILTERS.map(({ title, value }) => (
            <MenuItem value={value}>{title}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Filters;
