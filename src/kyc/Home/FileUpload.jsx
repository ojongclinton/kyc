import React, { useState, useEffect } from "react";
import "./style.css";

function FileUpload() {
  const [userPic, setUserPic] = useState(null);
  const [backIdPic, setBackIdPic] = useState(null);
  const [frontIdPic, setFrontIdPic] = useState(null);

  const [userPicUrl, setUserPicUrl] = useState("");
  const [backIdPicUrl, setBackIdPicUrl] = useState("");
  const [frontIdPicUrl, setFrontIdPicUrl] = useState("");

  useEffect(() => {
    if (userPic) {
      setUserPicUrl(URL.createObjectURL(userPic));
    }
    if (backIdPic) {
      setBackIdPicUrl(URL.createObjectURL(backIdPic));
    }
    if (frontIdPic) {
      setFrontIdPicUrl(URL.createObjectURL(frontIdPic));
    }
  }, [userPic, backIdPic, frontIdPic]);

  return (
    <div>
      <div id="main">
        <div id="inputDivs">
          <div>
          <p>User Picture</p>
           
            <input
              onChange={(e) => setUserPic(e.target.files[0])}
              type="file"
              accept=".pdf,.jpg,.jpeg"
              placeholder="sdsds"
            />
          </div>
          <div>
            <p>Back Id</p>
            <input
              onChange={(e) => setBackIdPic(e.target.files[0])}
              type="file"
              accept=".pdf,.jpg,.jpeg"
            />
          </div>
          <div>
          <p>Front Id </p>
            <input
              onChange={(e) => setFrontIdPic(e.target.files[0])}
              type="file"
              accept=".pdf,.jpg,.jpeg"
            />
          </div>
        </div>
        <div className="picturesContainer">
          {userPicUrl && (
            <div>
              <img src={userPicUrl} alt="User" />
            </div>
          )}

          {backIdPicUrl && (
            <div>
              <img src={backIdPicUrl} alt="Back ID" />
            </div>
          )}

          {frontIdPic && (
            <div>
              <img src={frontIdPicUrl} alt="Front ID" />
            </div>
          )}
        </div>
        { frontIdPic && backIdPic && userPic &&
          <div id="btnHolder">
        <button>Verify Identity</button>
      </div>
        }

      </div>
    </div>
  );
}

export default FileUpload;
