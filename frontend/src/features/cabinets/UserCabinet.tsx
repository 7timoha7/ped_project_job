import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Box, Card, CardContent, Grid, List} from '@mui/material';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ListItemButton from '@mui/material/ListItemButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useAppDispatch} from '../../app/hooks';
import HomeIcon from '@mui/icons-material/Home';
import MyInformation from './components/MyInformation';
import {CabinetState} from '../../types';

const initialState: CabinetState = {
  orders: false,
  favorites: false,
  myInfo: true,
};

interface Props {
  exist?: CabinetState;
}

const UserCabinet: React.FC<Props> = ({exist = initialState}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const [state, setState] = React.useState<CabinetState>(exist);

  useEffect(() => {

  }, [dispatch]);

  const handleClickOrders = () => {
    setState((prev) => ({...prev, orders: true, favorites: false, myInfo: false}));
  };

  const handleClickFavorites = () => {
    setState((prev) => ({...prev, orders: false, favorites: true, myInfo: false}));
  };

  const handleClickMyInfo = () => {
    setState((prev) => ({...prev, orders: false, favorites: false, myInfo: true}));
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
                <ListItemButton onClick={handleClickOrders}>
                  <ListItemIcon>
                    <MapsHomeWorkIcon/>
                  </ListItemIcon>
                  <ListItemText primary={t('myOrders')}/>
                </ListItemButton>
                <ListItemButton onClick={handleClickFavorites}>
                  <ListItemIcon>
                    <FavoriteIcon/>
                  </ListItemIcon>
                  <ListItemText primary={t('myFavorites')}/>
                </ListItemButton>
              </List>
            </Grid>
            <Grid item xs>
              {state.myInfo && <MyInformation/>}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserCabinet;
