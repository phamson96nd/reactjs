import React, { useEffect, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { createClient } from 'graphql-ws';
import { Badge, Menu, MenuItem } from '@mui/material';

const client = createClient({
  url: 'ws://localhost:4000/graphql'
});

const query = `subscription PushNotification {
  notification {
    message
  }
}`;

export default function PushNotification() {
  useEffect(() => {
    (async () => {
      const subscription = client.iterate({
        query
      });

      for await (const event of subscription) {
        expect(event).toEqual({ greetings: 'Hi' });

        break;
      }
    })();
  }, []);

  return (
    <NotificationsIcon />
  )
}