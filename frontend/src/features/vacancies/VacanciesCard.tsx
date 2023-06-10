import React from 'react';
import {Card, CardContent, IconButton, Typography} from '@mui/material';
import {VacanciesOnServer} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../users/usersSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import {getMyVacancies, removeVacancies} from "./VacanciesThunks";
import {selectLoadingRemoveVacancies} from "./VacanciesSlice";
import {useLocation, useNavigate} from "react-router-dom";

interface Props {
  item: VacanciesOnServer
}

const VacanciesCard: React.FC<Props> = ({item}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectLoadingRemoveVacancies);
  const location = useLocation();

  const deleteVacancies = async () => {
    await dispatch(removeVacancies(item._id));
    await dispatch(getMyVacancies());
  }

  return (
    <>
      <Card variant="outlined" sx={{maxWidth: '100%', margin: '20px auto'}}
            onClick={() => navigate('/vacancies/' + item._id)}>
        <CardContent sx={{position: 'relative'}}>
          <Typography variant="h6" gutterBottom>
            {item.vacancyName}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            {item.nameOrganisation}
          </Typography>

          {(user?._id.toString() === item.user.toString() && location.pathname === '/my-cabinet') && (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                void deleteVacancies();
              }}
              disabled={loading === item._id}
              aria-label="delete"
              color="error"
              sx={{
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translateY(-50%)',
              }}
            >
              <DeleteIcon/>
            </IconButton>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default VacanciesCard;