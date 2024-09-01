/* eslint-disable react/prop-types */
import "./index.scss";

export default function Button({ methode, Logout }) {
  return (
    <>
      <div className="btn-container"> 
        <button onClick={methode} className="common-btn">
          View Profile
        </button>
        <button onClick={Logout} className="common-btn">
          Sign Out
        </button>
      </div>
    </>
  );
}
