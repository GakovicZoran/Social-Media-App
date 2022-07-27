export interface IUsers {
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
  setUser: (user: any) => void;
  logOut: () => void;
  signIn: (email: string, password: string) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  users: IUsers[];
  setUsers: (user: IUsers[]) => void;
  bio: object;
  setBio: React.Dispatch<React.SetStateAction<{}>>;
  posts: IPosts[];
  setPosts: React.Dispatch<React.SetStateAction<IPosts[]>>;
  textComment: string;
  setTextComment: React.Dispatch<React.SetStateAction<string>>;
  following: IFollow[];
  setFollowing: React.Dispatch<React.SetStateAction<IFollow[]>>;
  followers: IFollow[];
  setFollowers: React.Dispatch<React.SetStateAction<IFollow[]>>;
  liked: any[];
  setLiked: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface IUserBio {
  userGender: string;
  userAge: number;
  userPhoneNumber: number;
  userBirthDate: string;
  id: string;
}

export interface IMessages {
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
  postOwnerID: string;
  ownersName: string;
  ownerPhoto: string;
  unicatePostID: string;
  ownerID: string;
}

export interface IPosts {
  userPost: string;
  userPostPhoto: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  id: string;
  ownerID: string;
  ownerName: string;
  ownerPhoto: string;
  comments: [];
  likeID: [];
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

export interface IFollow {
  userName: string;
  id: string;
  uid: string;
  userPhoto: string;
}
