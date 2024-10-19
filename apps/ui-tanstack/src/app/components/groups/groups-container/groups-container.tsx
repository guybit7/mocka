import { Button } from '@mui/material';
import styles from './groups-container.module.scss';
import { useMutation } from '@tanstack/react-query';
import { createGroup } from '@ui-tanstack/common';
import { useState } from 'react';

export function GroupsContainer() {
  const [formData, setFormData] = useState({
    name: 'TTT',
  });

  const { mutate } = useMutation({
    mutationFn: ({ formData }) => createGroup({ formData }),
    onSuccess: () => {
      console.log('SUCCESS');
    },
  });

  const create = (event: any) => {
    mutate({
      formData: formData,
    });
  };

  return (
    <div className={styles['groups-container']}>
      <h1>Welcome to GroupsContainer!</h1>
      <Button type="button" onClick={create}>
        CREATE
      </Button>
    </div>
  );
}

export default GroupsContainer;
