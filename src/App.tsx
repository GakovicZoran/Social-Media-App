import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignIn } from "./components/Auth/SignIn";
import { SignUp } from "./components/Auth/SignUp";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { useEffect, useState } from "react";
import { auth, db } from "./components/data/firebaseConfig";
import { Explore } from "./components/Body/Explore";
import { Profile } from "./components/Body/Profile/Profile";
import { setDoc, doc, getDocs } from "firebase/firestore";
import { AuthContext } from "./components/Context/AuthContext";
import { ForgotPassword } from "./components/Auth/ForgotPassword";
import firebase from "firebase/compat/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { IFollow, IPosts, IUsers } from "./components/Interfaces/Interfaces";

const App = () => {
  // Nisam znao rijesiti ANY, ima u interfaces ICurrentUser
  const [user, setUser] = useState<any>({});
  const [users, setUsers] = useState<IUsers[]>([]);
  const [bio, setBio] = useState<{}>({});
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [textComment, setTextComment] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [following, setFollowing] = useState<IFollow[]>([]);
  const [followers, setFollowers] = useState<IFollow[]>([]);
  const [liked, setLiked] = useState<string[]>([]);

  useEffect(() => {
    const getFollowingsInfo = async () => {
      const followingsCollectionRef = db.collection(
        `users/${auth.currentUser?.uid}/followings`
      );
      const dataFollowings = await getDocs(followingsCollectionRef);
      try {
        setFollowing(
          dataFollowings.docs.map((doc) => {
            return { ...doc.data(), id: doc.id } as IFollow;
          })
        );
      } catch (err) {
        console.error(err);
      }
    };
    getFollowingsInfo();
  }, [user, users]);

  useEffect(() => {
    const getFollowersInfo = async () => {
      const followersCollectionRef = db.collection(
        `users/${auth.currentUser?.uid}/followers`
      );
      const dataFollowers = await getDocs(followersCollectionRef);
      try {
        setFollowers(
          dataFollowers.docs.map((doc) => {
            return { ...doc.data(), id: doc.id } as IFollow;
          })
        );
      } catch (err) {
        console.error(err);
      }
    };
    getFollowersInfo();
  }, [user, users]);

  const createUser = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL:
          "https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg",
      });

      try {
        await setDoc(doc(db, "users", `${auth.currentUser?.uid}`), {
          userEmail: auth.currentUser?.email,
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
  }, [users]);

  const logOut = () => {
    return signOut(auth);
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
        setUser,
        logOut,
        signIn,
        name,
        setName,
        email,
        setEmail,
        users,
        setUsers,
        bio,
        setBio,
        posts,
        setPosts,
        following,
        setFollowing,
        followers,
        setFollowers,
        textComment,
        setTextComment,
        liked,
        setLiked,
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
