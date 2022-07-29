import { Grid } from '@mui/material';
import { TabProps, TabPanel } from '../base/TabPanel';
import GenericSelect from '../../components/fields/GenericSelect';

export default (props: TabProps) => {
  const { value, index } = props;

  return (
    <TabPanel index={index} value={value} title="Bonus Feature">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <GenericSelect title="Chris Costumes" ipcName="chris_costumes" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <GenericSelect title="Sheva Costumes" ipcName="sheva_costumes" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <GenericSelect title="Scene Filters" ipcName="screen_filters" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <GenericSelect title="Infinite Ammo Weapons" ipcName="inf_ammo_weapons"/>
        </Grid>
      </Grid>
    </TabPanel>
  );
};
