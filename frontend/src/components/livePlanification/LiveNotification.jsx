import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';

const LiveNotification = ({ isLive }) => {
  return (
    <>
      {isLive && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          Une session en direct est actuellement en cours !
        </Alert>
      )}
    </>
  );
};

export default LiveNotification;
