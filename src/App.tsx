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
import {
  IComments,
  IFollowers,
  IMessage,
  IPost,
  IUser,
} from "./components/Interfaces/Interfaces";
import { AuthContext } from "./components/Context/AuthContext";
import { ForgotPassword } from "./components/Auth/ForgotPassword";
import firebase from "firebase/compat/app";

const App = () => {
  const [user, setUser] = useState<any>({});
  const [userInfo, setUserInfo] = useState<IUser[]>([]);
  const [bio, setBio] = useState<{}>({});
  const [storingPost, setStoringPost] = useState<IPost[]>([]);
  const [textPost, setTextPost] = useState<string>("");
  const [postComment, setPostComment] = useState<IComments[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [followers, setFollowers] = useState<IFollowers[]>([]);

  const createUser = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL:
          "https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg",
      });

      try {
        await setDoc(doc(db, "users", `${auth.currentUser.uid}`), {
          userEmail: auth.currentUser.email,
          userName: name,
          userBio: bio,
          userPhoto:
            "https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg",
          userCoverPhoto:
            "https://content.nevernotfunny.com/resources/web_res/images/defaultCover.png",
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
        textPost,
        setTextPost,
        postComment,
        setPostComment,
        followers,
        setFollowers,
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
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
