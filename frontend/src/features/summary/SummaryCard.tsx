import React from 'react';
import {Card, CardContent, IconButton, Typography} from '@mui/material';
import {SummaryOnServer} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../users/usersSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import {useLocation, useNavigate} from "react-router-dom";
import {getMySummary, removeSummary} from "./summaaryThunks";
import {selectLoadingRemoveSummary} from "./summarySlice";

interface Props {
  item: SummaryOnServer
}

const SummaryCard: React.FC<Props> = ({item}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectLoadingRemoveSummary);
  const location = useLocation();

  const deleteSummary = async () => {
    await dispatch(removeSummary(item._id));
    await dispatch(getMySummary());
  }

  return (
    <>
      <Card variant="outlined" sx={{maxWidth: '100%', margin: '20px auto'}}
            onClick={() => navigate('/summary/' + item._id)}>
        <CardContent sx={{position: 'relative'}}>
          <Typography variant="h6" gutterBottom>
            Job title: {item.jobTitle}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Experience: {item.experience + ' year/years'}
          </Typography>

          {user?._id.toString() === item.user.toString() && location.pathname === '/my-cabinet' && (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                void deleteSummary();
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

export default SummaryCard;