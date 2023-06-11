import React, {useState} from 'react';
import {ResponseOnServer} from "../../types";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import {useAppDispatch} from "../../app/hooks";
import {getMyResponse, responseNew} from "./ResponseThunks";

interface Props {
  item: ResponseOnServer;
}

const ResponseCard: React.FC<Props> = ({item}) => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
    dispatch(responseNew(item._id));
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(getMyResponse());
  };

  return (
    <>
      <Card variant="outlined" sx={{maxWidth: '100%', margin: '20px auto'}}>
        <CardContent sx={{position: 'relative'}}>
          {item.newResponse &&
            <Typography color={"red"} variant="subtitle1" gutterBottom>
              NEW
            </Typography>}

          <Typography variant="h6" gutterBottom>
            From: {item.worker.firstName + ' ' + item.worker.lastName}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            For a job: {item.vacanciesName}
          </Typography>

          <Button
            onClick={(event) => {
              event.stopPropagation();
              handleClickOpen();
            }}
            aria-label="delete"
            color="success"
            sx={{
              position: 'absolute',
              top: '50%',
              right: 5,
              transform: 'translateY(-50%)',
            }}
          >
            User contacts
          </Button>

        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User Contacts</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Name: {item.worker.firstName} {item.worker.lastName}<br/>
            Phone: {item.worker.phoneNumber}<br/>
            Email: {item.worker.email}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResponseCard;
