import React from 'react';
import {useTranslation} from 'react-i18next';
import {Box, Card, CardContent, Grid, List} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MyInformation from './components/MyInformation';
import {CabinetState} from '../../types';
import MySummary from "./components/MySummary";

const initialState: CabinetState = {
  mySummary: false,
  myInfo: true,
};

interface Props {
  exist?: CabinetState;
}

const UserCabinet: React.FC<Props> = ({exist = initialState}) => {
  const {t} = useTranslation();

  const [state, setState] = React.useState<CabinetState>(exist);


  const handleClickSummary = () => {
    setState((prev) => ({...prev, mySummary: true, myInfo: false}));
  };

  const handleClickMyInfo = () => {
    setState((prev) => ({...prev, mySummary: false, myInfo: true}));
  };

  return (
    <Box mt={3}>
      <Card sx={{minHeight: '600px'}}>
        <CardContent>
          <Grid container flexDirection="row" spacing={2} alignItems="self-start">
            <Grid item xs={12} sm={6} md={3}>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                  border: '2px solid #c5c5c5',
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={handleClickMyInfo}>
                  <ListItemIcon>
                    <HomeIcon/>
                  </ListItemIcon>
                  <ListItemText primary={t('myInfo')}/>
                </ListItemButton>

                <ListItemButton onClick={handleClickSummary}>
                  <ListItemIcon>
                    <HomeIcon/>
                  </ListItemIcon>
                  <ListItemText primary={t('mySummary')}/>
                </ListItemButton>

              </List>
            </Grid>
            <Grid item xs>
              {state.myInfo && <MyInformation/>}
              {state.mySummary && <MySummary/>}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserCabinet;
