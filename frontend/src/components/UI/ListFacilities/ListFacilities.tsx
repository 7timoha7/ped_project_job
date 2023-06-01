import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, Menu } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: number;
}

const ListFacilities: React.FC<Props> = ({ onChange, width }) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const facilities = [
    { id: 'nonSmokingRooms', title: t('noneSmokingRoom') },
    { id: 'parking', title: t('parking') },
    { id: 'swimmingPool', title: t('pool') },
    { id: 'petFriendly', title: t('petFriendly') },
  ];

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          color: 'grey',
          height: '56px',
          border: '1px solid lightgrey',
          textTransform: 'capitalize',
          fontSize: '18px',
          width,
        }}
      >
        {t('facilities')}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <FormGroup sx={{ p: 1 }}>
          {facilities.map((facility) => (
            <FormControlLabel
              key={facility.id}
              control={<Checkbox onChange={onChange} name={facility.id} />}
              label={facility.title}
            />
          ))}
        </FormGroup>
      </Menu>
    </>
  );
};

export default ListFacilities;
