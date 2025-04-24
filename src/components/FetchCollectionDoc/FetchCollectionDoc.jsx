// File: FetchCollectionDocuments.js
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FireBase/firebase";
import { FidgetSpinner } from "react-loader-spinner";
import { Link } from "react-router-dom";
import "./FetchCollectionDoc.css";

const FetchCollectionDoc = ({ collectionName, title }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchDocuments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const dataList = [];
      querySnapshot.forEach((doc) => {
        dataList.push({ id: doc.id, ...doc.data() });
      });
      setData(dataList);
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError("Error fetching documents");
    } finally {
      setLoading(false);
    }
  };
const dirc = (id) => {
  if (collectionName.toLowerCase() === "processing" && id === "1") {
    return "/Details/Proccessing/1";
  } else {
    return `/Details/${collectionName}/${id}`;
  }

};
  useEffect(() => {
    fetchDocuments();
  }, [collectionName]);

  return (
    <div>
      {loading && (
        <div className="d-flex vh-100 justify-content-center align-items-center">
          <FidgetSpinner
            visible={true}
            height="200"
            width="200"
            ariaLabel="fidget-spinner-loading"
            wrapperStyle={{}}
            wrapperClass="fidget-spinner-wrapper"
          />
        </div>
      )}
      {error && <p>{error}</p>}
      {data && (
        <div className="container text-center">
          <h3 className="mb-4 fw-bolder main-head fs-1">{title}</h3>
          <div className="row mb-5 text-center">
            {data.map((item) => (
              <div key={item.id} className="col-lg-12 ">
                <Link to={dirc(item.id)} className="link main">
                  <div className="card mt-5 shadow p-0 rounded-3 overflow-hidden ">
                    <div className="div d-flex align-items-center">
                      <h3 className="col-lg-6">{item.title}</h3>
                      <img src={item.url} alt="" className=" image" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchCollectionDoc;
