import { Grid } from '@mui/material';
import { TabProps, TabPanel } from '../base/TabPanel';
import GenericSelect from '../../components/fields/GenericSelect';

export default (props: TabProps) => {
  const { value, index } = props;

  return (
    <TabPanel index={index} value={value} title="Game Library">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <GenericSelect title="Game Files" ipcName="game_files" />
        </Grid>
        <Grid item xs={12}>
          <GenericSelect title="Game Figures" ipcName="game_figures" />
        </Grid>
      </Grid>
    </TabPanel>
  );
};
