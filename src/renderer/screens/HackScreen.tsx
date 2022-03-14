import { Button, Divider, Grid } from '@mui/material';

import { BaseScreenWithTitle } from './base/BaseScreen';
import SaveHeader from '../components/forms/SaveHeader'
import SaveData from '../components/forms/SaveData'

export default function HackScreen() {
  const saveFile = (event: any) => window.electron.ipcRenderer.send(`save`)

  return (
    <BaseScreenWithTitle title="Save Editor">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Divider>Save Info</Divider>
        </Grid>
        <Grid item xs={12}>
          <SaveHeader />
        </Grid>
        <Grid item xs={12}>
          <Divider>Save Edit</Divider>
        </Grid>
        <Grid item xs={12}>
          <SaveData />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {/* <VaultItemCpnt vault={1}/> */}
        </Grid>
      </Grid>

      <Divider />

      <Grid container spacing={4} justifyContent="flex-end" sx={{ pt: 2 }}>
        <Grid item>
          <Button
            variant="outlined"
            color="error"
            component="span"
            size="large"
            onClick={saveFile}
          >
            Save File
          </Button>
        </Grid>
      </Grid>
    </BaseScreenWithTitle>
  )
}
