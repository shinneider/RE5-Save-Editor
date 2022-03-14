import { Grid } from '@mui/material';
import GenericField from '../fields/GenericField'

export default function SaveHeader() {

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} lg={4}>
        <GenericField title="Steam ID" ipcName="steam_id" type="text" ipcSet/>
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        <GenericField title="Save Date" ipcName="save_date" type="datetime-local" ipcSet/>
      </Grid>

      <Grid item xs={6} lg={2}>
        <GenericField title="Save Checksum" ipcName="save_checksum" type="text" />
      </Grid>

      <Grid item xs={6} lg={2}>
        <GenericField title="Real Checksum" ipcName="file_checksum" type="number" updateInterval={750}/>
      </Grid>
    </Grid>
  );
}
