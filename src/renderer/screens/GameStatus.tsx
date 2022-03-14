import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { BaseScreenWithTitle } from './base/BaseScreen';

export default function GameStatus(props: any) {
  const navigate = useNavigate();

  const testDialog = async () => {
    const openedSave = await window.electron.ipcRenderer.invoke('open-save');
    if (openedSave) navigate('/hack-form');
  };

  return (
    <BaseScreenWithTitle title="Load save file">
      <Button
        variant="outlined"
        color="error"
        component="span"
        size="large"
        fullWidth
        onClick={testDialog}
      >
        Select File
      </Button>
    </BaseScreenWithTitle>
  );
}
