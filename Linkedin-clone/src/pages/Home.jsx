import { useMemo, useState } from "react";
import PostStatus from "../componants/PostsUpdate";
import TopBar from "../componants/TopBar";
import { GetCurrentUser } from "../api/FireStoreAPI";

export default function Home() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    GetCurrentUser(setCurrentUser);
  }, []);

  return (
    <>
      <TopBar />
      <PostStatus currentUser={currentUser} />
    </>
  );
}
