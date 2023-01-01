import React from 'react';
import useAuthorizedSession from '../hooks/useAuthorizedSession';
import AppNavigator from './appNavigator/AppNavigator';
import AuthNavigator from './authNavigator/AuthNavigator';

const Navigation = () => {
  const [authToken] = useAuthorizedSession();

  return authToken ? <AppNavigator /> : <AuthNavigator />;
};

export default Navigation;
