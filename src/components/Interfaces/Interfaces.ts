export interface IUser {
  userEmail: string;
  userName: string;
  userPhoto: string;
  id: string;
}

export interface IAuthContext {
  createUser: (email: string, password: string) => void;
  passwordReset: (email: string) => void;

  user: {
    accessToken: string;
    auth: object;
    displayName: null;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: object;
    phoneNumber: null;
    photoURL: null;
    proactiveRefresh: object;
    providerData: object;
    providerId: string;
    reloadListener: null;
    reloadUserInfo: object;
    stsTokenManager: object;
    tenantId: null;
    uid: string;
  };
  logOut: () => void;
  signIn: (email: string, password: string) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  userInfo: IUser[];
  setUserInfo: (user: IUser[]) => void;
  bio: any;
  setBio: React.Dispatch<React.SetStateAction<IUserBio>>;
  messages: any;
  setMessages: React.Dispatch<React.SetStateAction<IMesProp[]>>;
  storingPost: any;
  setStoringPost: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface IUserBio {
  userGender: string;
  userAge: null;
  userPhoneNumber: null;
  userBirthDate: string;
  id: string;
}

export interface IMesProp {
  createdAt: number;
  name: string;
  photoURL: string;
  text: string;
  uid: string;
}
