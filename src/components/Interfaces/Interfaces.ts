export interface IUser {
  userEmail: string;
  userName: string;
  userPhoto: string;
  userCoverPhoto: string;
  id: string;
  userBio: {
    gender: string;
    age: number;
    phoneNumber: number;
    birthDate: string;
    id: string;
  };
}

export interface IAuthContext {
  createUser: (email: string, password: string) => void;
  passwordReset: (email: string) => void;

  user: ICurrentUser;

  logOut: () => void;
  signIn: (email: string, password: string) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  userInfo: IUser[];
  setUserInfo: (user: IUser[]) => void;
  bio: object;
  setBio: React.Dispatch<React.SetStateAction<{}>>;
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  storingPost: IPost[];
  setStoringPost: React.Dispatch<React.SetStateAction<IPost[]>>;
  textPost: string;
  setTextPost: React.Dispatch<React.SetStateAction<string>>;
  postComment: IComments[];
  setPostComment: React.Dispatch<React.SetStateAction<IComments[]>>;
  followers: IFollowers[];
  setFollowers: React.Dispatch<React.SetStateAction<IFollowers[]>>;
}

export interface IUserBio {
  userGender: string;
  userAge: number;
  userPhoneNumber: number;
  userBirthDate: string;
  id: string;
}

export interface IMessage {
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  id: string;
  name: string;
  photoURL: string;
  text: string;
  fromID: string;
}

export interface IComments {
  userComment: string;
  userCommentName: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  id: string;
  postID: string;
}

export interface IPost {
  userPost: string;
  userPostPhoto: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  id: string;
}

export interface IFile {
  lastModified: number;
  lastModifiedDate: {};
  name: string;
  size: number;
  type: string;
  webkitRelativePath: "";
}

export interface ICurrentUser {
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
}

export interface IFollowers {
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  userName: string;
}
