import { useEffect, useState } from "react";

import { TextField } from '@mui/material';
import { GenericFieldProps } from './props'

export default function GenericField(props: GenericFieldProps) {
  const ipc = window.electron.ipcRenderer
  const [retryValue, setRetryValue] = useState<string>("");

  const setValue = (event: any) => {
    if(props.ipcSet) ipc.send(`set-${props.ipcName}`, event.target.value)
    setRetryValue(event.target.value);
  }

  const fetchData = async () => {
    let res = await ipc.invoke(`get-${props.ipcName}`)
    if(props.type === "datetime-local" && res instanceof Date) {
      res = res.toISOString().replace('Z', '')
    }
    setRetryValue(res.toString());
  };

  useEffect(() => {
    fetchData();

    if(props.updateInterval) {
      const interval = setInterval(() => fetchData(), 2000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <TextField
      label={props.title}
      variant="outlined"
      type={props.type}
      size="small"
      fullWidth
      value={retryValue}
      onChange={setValue}
      disabled={!props.ipcSet}
      />
  );
}
