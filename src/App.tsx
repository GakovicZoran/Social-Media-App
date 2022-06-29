import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignIn } from "./components/Auth/SignIn";
import { SignUp } from "./components/Auth/SignUp";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./components/data/firebaseConfig";
import { Explore } from "./components/Body/Explore";
import { Profile } from "./components/Body/Profile/Profile";
import { setDoc, doc } from "firebase/firestore";
import { IMesProp, IUser, IUserBio } from "./components/Interfaces/Interfaces";
import { AuthContext } from "./components/Context/AuthContext";
import { ForgotPassword } from "./components/Auth/ForgotPassword";
import firebase from "firebase/compat/app";
import { Chat } from "./components/Body/Profile/Chat/Chat";

const App = () => {
  /////////////////////// OVA DVA ZA SADA NISTA///////////
  const [storingPost, setStoringPost] = useState<any>([]);
  const [textPost, setTextPost] = useState<any>();
  ////////////////////////////////////////////////////
  const [user, setUser] = useState<any>({});
  const [userInfo, setUserInfo] = useState<IUser[]>([]);
  const [name, setName] = useState<string>("");
  // OVAJ EMAIL MI VJER NE TREBA JER VEC IMAM EMAIL U SIGN IN SIGN UP KORISTI OVAJ EMAIL ZA NJIH SVE
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<{}>({});
  const [messages, setMessages] = useState<IMesProp[]>([]);

  // Default user image
  const photoUrl =
    "https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg";

  const createUser = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUrl,
      });

      try {
        await setDoc(doc(db, "users", `${auth.currentUser.uid}`), {
          userEmail: auth.currentUser.email,
          userName: name,
          userBio: bio,
          userPhoto: photoUrl,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          // msg: messages,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubsrcibe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
    });
    unsubsrcibe();
  }, [userInfo]);

  const logOut = () => {
    return signOut(auth), setStoringPost([]), setUserInfo([]), setUser({});
  };

  const passwordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  console.log(user);
  console.log(userInfo);

  return (
    <AuthContext.Provider
      value={{
        createUser,
        passwordReset,
        user,
        logOut,
        signIn,
        name,
        setName,
        email,
        setEmail,
        userInfo,
        setUserInfo,
        bio,
        setBio,
        messages,
        setMessages,
        storingPost,
        setStoringPost,
      }}
    >
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/passwordReset" element={<ForgotPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path=":id" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
