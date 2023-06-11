import React from 'react';
import {Card, CardContent, IconButton, Typography} from '@mui/material';
import {ResponseToServer, VacanciesOnServer} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../users/usersSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import {getMyVacancies, removeVacancies} from "./VacanciesThunks";
import {selectLoadingRemoveVacancies} from "./VacanciesSlice";
import {useLocation, useNavigate} from "react-router-dom";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import {createResponse} from "../response/ResponseThunks";

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

  const addResponse = async () => {
    await dispatch(createResponse({
      employer: item.user.toString(),
      vacanciesId: item._id,
    }));
  }

  return (
    <>
      <Card variant="outlined" sx={{maxWidth: '100%', margin: '20px auto'}}
            onClick={() => navigate('/vacancies/' + item._id)}>
        <CardContent sx={{position: 'relative'}}>
          <Typography variant="h6" gutterBottom>
            Job title: {item.vacancyName}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Name organisation: {item.nameOrganisation}
          </Typography>

          <Typography variant="body1" gutterBottom>
            Salary: {item.salariesFrom + ' - ' + item.salariesTo} $
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
          {user?.role === 'summary' && (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                void addResponse();
              }}
              disabled={loading === item._id}
              aria-label="delete"
              color="success"
              sx={{
                position: 'absolute',
                top: '50%',
                right: 5,
                transform: 'translateY(-50%)',
              }}
            >
              <AddReactionIcon/>
            </IconButton>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default VacanciesCard;