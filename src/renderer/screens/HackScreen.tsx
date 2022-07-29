import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import SaveDataInfo from './tabs/SaveDataInfo';
import BonusFeature from './tabs/BonusFeature';
import GameLibrary from './tabs/GameLibrary';
import GameStats from './tabs/GameStats';

import './base/BaseScreen.css';

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Box sx={{ flexGrow: 1 }} className="content-container">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Save Data Info" {...a11yProps(0)} />
          <Tab label="Bonus Feature" {...a11yProps(1)} />
          <Tab label="Game Library" {...a11yProps(2)} />
          <Tab label="Game Stats" {...a11yProps(3)} />
        </Tabs>

        <Grid container>
          <SaveDataInfo value={value} index={0} />
          <BonusFeature value={value} index={1} />
          <GameLibrary value={value} index={2} />
          <GameStats value={value} index={3} />
        </Grid>
      </Box>
    </Grid>
  );
}
