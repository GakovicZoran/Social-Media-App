import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignIn } from "./components/Auth/SignIn";
import { SignUp } from "./components/Auth/SignUp";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  Auth,
} from "firebase/auth";
import { auth } from "./components/data/firebaseConfig";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { Explore } from "./components/Body/Explore";
import { Profile } from "./components/Body/Profile";

export const AuthContext = createContext<any>({});
const App = () => {
  const [user, setUser] = useState<any>({});
  const createUser = (email: any, password: any) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: any, password: any) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubsrcibe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });

    unsubsrcibe();
  }, []);
  console.log(auth);
  return (
    <AuthContext.Provider value={{ createUser, user, logOut, signIn }}>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore" element={<Explore />} />
            <Route path=":id" element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
