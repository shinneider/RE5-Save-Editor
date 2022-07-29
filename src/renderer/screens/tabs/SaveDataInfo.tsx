import { Button, Grid } from '@mui/material';
import { TabProps, TabPanel } from '../base/TabPanel';
import GenericField from '../../components/fields/GenericField';

export default (props: TabProps) => {
  const { value, index } = props;
  const saveFile = (event: any) => window.electron.ipcRenderer.send(`save`);

  return (
    <TabPanel index={index} value={value} title="Save Info">
      <Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <GenericField
              title="Steam ID"
              ipcName="steam_id"
              type="text"
              ipcSet
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <GenericField
              title="Save Date"
              ipcName="save_date"
              type="datetime-local"
              ipcSet
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <GenericField
              title="Save Checksum"
              ipcName="save_checksum"
              type="text"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <GenericField
              title="Real Checksum"
              ipcName="file_checksum"
              type="number"
              updateInterval={750}
            />
          </Grid>
        </Grid>

        <Grid container sx={{ pt: 2 }}>
          <Button
            variant="outlined"
            color="error"
            component="span"
            size="large"
            fullWidth
            onClick={saveFile}
          >
            Save File
          </Button>
        </Grid>
      </Grid>
    </TabPanel>
  );
};
