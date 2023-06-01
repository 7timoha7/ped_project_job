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
import MyVacancies from "./components/MyVacancies";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../users/usersSlice";
import AssignmentIcon from '@mui/icons-material/Assignment';

const initialState: CabinetState = {
  mySummary: false,
  myInfo: true,
  myVacancies: false,
};

interface Props {
  exist?: CabinetState;
}

const UserCabinet: React.FC<Props> = ({exist = initialState}) => {
  const {t} = useTranslation();

  const [state, setState] = React.useState<CabinetState>(exist);

  const user = useAppSelector(selectUser);


  const handleClickSummary = () => {
    setState((prev) => ({...prev, mySummary: true, myInfo: false, myVacancies: false}));
  };

  const handleClickVacancies = () => {
    setState((prev) => ({...prev, mySummary: false, myInfo: false, myVacancies: true}));
  };

  const handleClickMyInfo = () => {
    setState((prev) => ({...prev, mySummary: false, myInfo: true, myVacancies: false}));
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

                {user?.role === 'summary' &&
                  <ListItemButton onClick={handleClickSummary}>
                    <ListItemIcon>
                      <AssignmentIcon/>
                    </ListItemIcon>
                    <ListItemText primary={t('mySummary')}/>
                  </ListItemButton>}

                {user?.role === 'vacancies' &&
                  <ListItemButton onClick={handleClickVacancies}>
                    <ListItemIcon>
                      <AssignmentIcon/>
                    </ListItemIcon>
                    <ListItemText primary={t('myVacancies')}/>
                  </ListItemButton>}

              </List>
            </Grid>
            <Grid item xs>
              {state.myInfo && <MyInformation/>}
              {state.mySummary && <MySummary/>}
              {state.myVacancies && <MyVacancies/>}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserCabinet;