import { useMemo, useState } from "react";
import "../sass/Connections.scss";
import ConnectedUsers from "../componants/ConnectedUsers";
import { GetConnections, GetUsers } from "../api/FireStoreAPI";
import { useApp } from "../heplers/Context/useAppContext";
import TopBar from "../componants/TopBar";

export default function Connections() {
  const [users, setUsers] = useState([]);
  const [connections, setConnections] = useState([]);

  useMemo(() => {
    GetUsers(setUsers);
    GetConnections(setConnections);
  }, []);

  const { CurrentUser } = useApp();

  const connectionTargetIds = connections.map(
    (connection) => connection.targetId
  );

  return (
    <>
      <div className="topbar">
        <TopBar />
      </div>
      <div className="connections-main">
        {users.length > 0 ? (
          users
            .filter((user) => {
              return (
                user &&
                user.email !== CurrentUser?.email &&
                !connectionTargetIds.includes(user?.userId)
              );
            }).length > 0 ? (
              users
                .filter((user) => {
                  return (
                    user &&
                    user.email !== CurrentUser?.email &&
                    !connectionTargetIds.includes(user?.userId)
                  );
                })
                .map((user) => (
                  <ConnectedUsers user={user} key={user?.userId} />
                ))
            ) : (
              <h4>No Connections Available</h4>
            )
        ) : (
          <h4>No Users Found</h4>
        )}
      </div>
    </>
  );
  
  
}
