import { Grid } from '@mui/material';
import GenericField from '../fields/GenericField'
import GenericSelect from '../fields/GenericSelect'

export default function SaveHeader() {

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <GenericSelect title="Chris Costumes" ipcName="chris_costumes"/>
      </Grid>
      <Grid item xs={12} md={4}>
        <GenericSelect title="Sheva Costumes" ipcName="sheva_costumes"/>
      </Grid>
      <Grid item xs={12} md={4}>
        <GenericSelect title="Scene Filters" ipcName="screen_filters"/>
      </Grid>

      <Grid item xs={12} md={6}>
        <GenericSelect title="Infinite Ammo Weapons" ipcName="inf_ammo_weapons"/>
      </Grid>
      <Grid item xs={12} md={6}>
        <GenericSelect title="Game Files" ipcName="game_files"/>
      </Grid>
      <Grid item xs={12} md={6}>
        <GenericSelect title="Game Figures" ipcName="game_figures"/>
      </Grid>

      <Grid item xs={6} md={3}>
        <GenericField title="Money" ipcName="money" type="number" ipcSet/>
      </Grid>

      <Grid item xs={6} md={3}>
        <GenericField title="Points" ipcName="points" type="number" ipcSet/>
      </Grid>

    </Grid>
  );
}
