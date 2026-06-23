import React from 'react';
import { Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }) {
  // இப்போதைக்கு செக்யூரிட்டி இல்லாமல் லாகின் செய்யாமலே உள்ளே போக அனுமதிக்கிறது
  return <Outlet />;
}