export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  CreateSession: undefined;
  SessionDetail: { sessionId: string };
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};