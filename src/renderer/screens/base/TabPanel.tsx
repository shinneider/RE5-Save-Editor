import * as React from 'react';
import { Divider, Grid } from '@mui/material';

export interface TabProps {
  index: number;
  value: number;
}

export interface TabPanelProps extends TabProps {
  children?: React.ReactNode;
  title?: string;
  index: number;
  value: number;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, title } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      <Grid container sx={{ pl: 1 }}>
        {value === index && (
          <Grid container spacing={2}>
            { title && (<Grid item xs={12}>
              <Divider>{title}</Divider>
            </Grid>)}
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
