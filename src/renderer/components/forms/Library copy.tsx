import { Grid } from '@mui/material';
import GenericField from '../fields/GenericField';

export default function SaveDataInfo() {
  return (
    <Grid container spacing={4}>

      <Grid item xs={6} md={3}>
        <GenericField title="Money" ipcName="money" type="number" ipcSet />
      </Grid>

      <Grid item xs={6} md={3}>
        <GenericField title="Points" ipcName="points" type="number" ipcSet />
      </Grid>
    </Grid>
  );
}
