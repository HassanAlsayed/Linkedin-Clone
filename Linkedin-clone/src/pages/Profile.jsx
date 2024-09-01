import { useMemo, useState } from "react";
import ProfileCard from "../componants/Profile";
import { GetCurrentUser } from "../api/FireStoreAPI";
import ProfileEdit from "../componants/EditProfile";

export default function Profile() {
  const [currentuser, setCurrentUser] = useState({});
  const [isEdit, setisEdit] = useState(false);

  const onEdit = () => {
    setisEdit(!isEdit);
  };
  useMemo(() => {
    GetCurrentUser(setCurrentUser);
  }, []);

  return (
    <>
      {isEdit ? (
        <ProfileEdit currentUser={currentuser} onEdit={onEdit} />
      ) : (
        <ProfileCard currentuser={currentuser} onEdit={onEdit} />
      )}
    </>
  );
}
