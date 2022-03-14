import { Divider, Grid, Typography } from '@mui/material';
import { BaseScreenProps, BaseScreenTitleProps } from './props';
import './BaseScreen.css';

export const BaseScreen = (props: BaseScreenProps) => {
  const { children } = props;
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item className="content-container">
        {children}
      </Grid>
    </Grid>
  );
};

export const BaseScreenWithTitle = (props: BaseScreenTitleProps) => {
  const { children, title } = props;

  return (
    <BaseScreen>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" component="div" align="center" gutterBottom>
            {title}
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </BaseScreen>
  );
};
