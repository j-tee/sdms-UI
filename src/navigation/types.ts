export type RootStackParamList = {
    Home: undefined;
    Details: { id: string };
    Branches: { school: any }; // Added 'Branches' with its parameter type
    DeleteSchool: { school: any };
    SchoolDetails: { school: any };
  };