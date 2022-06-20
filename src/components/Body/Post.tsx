import { useEffect, useState } from "react";
import { db } from "../data/firebaseConfig";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
const createPostContainer = css`
  width: 500px;
  margin-top: 50px;
  border: 1px solid black;

  & form {
  }

  & img {
    width: 200px;
  }
`;

const createPostTitle = css`
  background-color: rgb(224, 224, 224);
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  & h3 {
    margin-top: 0;
  }
`;

const userThoughtsInput = css`
  width: 98%;
  height: 120px;
  font-size: 16px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const userInfoContainer = css`
  margin-top: 50px;
  border: 1px solid black;

  & ul {
    padding: 0;
    margin: 0;
  }
`;

const userShareInfo = css`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const userProfilePostImg = css`
  width: 50px;
  border-radius: 100px;
`;

const userPostImg = css`
  width: 200px;
`;

const likeItCommentIt = css`
  border: 2px solid black;
`;
export const Post = () => {
  const [textPost, setTextPost] = useState<string>("");
  const [storingPost, setStoringPost] = useState<any>([]);
  const [matchID, setMatchID] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const { user } = useContext(AuthContext);
  const postCollectionRef = db.collection("post");

  const handlePostChange = (e: any) => {
    setTextPost(e.target.value);
  };

  const handleUpload = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (textPost === "") return;
    try {
      await db.collection("post").add({
        userPost: textPost,
        imagePost: selectedFile,
      });
    } catch (err) {
      console.log(err);
    }
    setTextPost("");
    setSelectedFile("");
  };

  useEffect(() => {
    const getPostInfo = async () => {
      const data = await getDocs(postCollectionRef);

      try {
        setStoringPost(
          data.docs.map((doc: any) => {
            setMatchID(doc.id);

            return { ...doc.data(), id: doc.id };
          })
        );
      } catch (err) {
        //Kao i prije mozes napraviti state za success gore i error za ovdje
        console.error(err);
      }
    };

    getPostInfo();
  }, [textPost]);

  // Delete post from firebase //
  const deletePost = async (id: string) => {
    const postDoc = doc(db, "post", id);
    try {
      await deleteDoc(postDoc);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async () => {
    deletePost(matchID);
  };

  return (
    <div>
      <div className={createPostContainer}>
        <div className={createPostTitle}>
          <h3>Create Post</h3>
        </div>

        <form>
          <textarea
            onChange={handlePostChange}
            placeholder="Write something here"
            value={textPost}
            className={userThoughtsInput}
          ></textarea>
        </form>
        <FontAwesomeIcon icon={faImage} />
        <input
          type="file"
          // value={selectedFile}
          onChange={(e: any) => {
            setSelectedFile(URL.createObjectURL(e.target.files[0]));
          }}
        ></input>
        <button onClick={handleUpload}>POST</button>
        <img src={selectedFile} alt="Loading.." />
      </div>

      <div className={userInfoContainer}>
        {storingPost?.map(({ userPost, id, imagePost }: any) => {
          return (
            <ul key={id}>
              <div className={userShareInfo}>
                <div>
                  <img
                    className={userProfilePostImg}
                    src="http://getdrawings.com/img/facebook-profile-picture-silhouette-female-3.jpg"
                    alt="Loading..."
                  />
                </div>
                <div>
                  <p>{user.email}</p>
                  <p>DATUM</p>
                </div>

                <button>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={handleDeletePost}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>

              <li>
                <p>{userPost}</p>
              </li>
              <img src={imagePost} alt="Loading.." className={userPostImg} />
              <div className={likeItCommentIt}>
                <button>Srce</button>
                <button>Komentar</button>
              </div>
            </ul>
          );
        })}
      </div>
    </div>
  );
};
