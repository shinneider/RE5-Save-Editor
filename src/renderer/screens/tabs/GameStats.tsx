import { Grid, Divider } from '@mui/material';
import { TabProps, TabPanel } from '../base/TabPanel';
import GenericField from '../../components/fields/GenericField';

export default (props: TabProps) => {
  const { value, index } = props;

  return (
    <TabPanel index={index} value={value}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Divider>Money & Points</Divider>
            </Grid>
            <Grid item xs={6}>
              <GenericField title="Money" ipcName="money" type="number" ipcSet />
            </Grid>

            <Grid item xs={6}>
              <GenericField title="Points" ipcName="points" type="number" ipcSet />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Divider>Play Stats</Divider>
            </Grid>
            <Grid item xs={12} sm={12}>
              <GenericField title="Play Time (seconds)" ipcName="play_time" type="number" ipcSet />
            </Grid>

            <Grid item xs={6} sm={3}>
              <GenericField title="Rescue Times" ipcName="rescue_times" type="number" ipcSet />
            </Grid>

            <Grid item xs={6} sm={3}>
              <GenericField title="Rescued Times" ipcName="rescued_times" type="number" ipcSet />
            </Grid>

            <Grid item xs={6} sm={3}>
              <GenericField title="Save From Dying" ipcName="save_from_dying" type="number" ipcSet />
            </Grid>

            <Grid item xs={6} sm={3}>
              <GenericField title="Saved From Dying" ipcName="saved_from_dying" type="number" ipcSet />
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider>Weapon Usage</Divider>
            </Grid>

          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider>Enemy Kills</Divider>
            </Grid>

          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider>Level Records</Divider>
            </Grid>

          </Grid>
        </Grid> */}
      </Grid>
    </TabPanel>
  );
};
