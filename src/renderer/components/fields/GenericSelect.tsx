import { useEffect, useState } from "react";
import { GenericSelectProps } from './props'
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};

export default function GenericSelect(props: GenericSelectProps) {
  const ipc = window.electron.ipcRenderer
  const [retryValue, setRetryValue] = useState([]);
  const [choicesValue, setChoicesValue] = useState([]);

  const setValue = (event: any) => {
    const selects = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
    setRetryValue(selects);
    ipc.send(`set-${props.ipcName}`, selects)
  };

  const fetchData = async () => {
    setRetryValue(await ipc.invoke(`get-${props.ipcName}`))
    setChoicesValue(await ipc.invoke(`get-${props.ipcName}_choices`))
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="demo-multiple-checkbox-label">{props.title}</InputLabel>
      <Select
        multiple
        autoWidth
        value={retryValue}
        onChange={setValue}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {choicesValue.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={retryValue.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
