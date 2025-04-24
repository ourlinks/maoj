import React, { useState, useEffect } from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; // استخدم getDoc لجلب وثيقة واحدة
import { db } from "../../FireBase/firebase";

const Details = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id, collectionname } = useParams(); // استخدم useParams للحصول على collectionname و id

  const fetchDocument = async () => {
    try {
      const docRef = doc(db, collectionname, id); // استخدم collectionname و id
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data()); // قم بتعيين بيانات الوثيقة
      } else {
        setError("Document not found");
      }
    } catch (err) {
      console.error("Error fetching document:", err);
      setError("Error fetching document");
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchDocument();
  }, [id, collectionname]);

  return (
    <div>
      {loading && <p>Loading document...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div className="detail p-3 ">
          <div className="container detail-box mb-5">
            <h3 className="mb-4 text-center">
              <span className="title-main fw-bold"> {data.title}</span>
            </h3>
            <div className="row mt-5 mb-5 justify-content-center">
              <div className="col-lg-6 mb-5">
                <img
                  src={data.url}
                  alt={data.title}
                  className="mx-2 w-100 me-2"
                />
              </div>

              <p
                className="fs-4"
                dangerouslySetInnerHTML={{ __html: data.d1 }}
              ></p>
            </div>
            {data.link && (
              <div className="text-center pb-3">
                <a
                  href={data.link}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer" 
                >
                  Read More
                </a>
              </div>
            )}
          </div>
          <div>
            <button
              className="bottom-up "
              onClick={scrollToTop}
              style={{ display: window.scrollY > 0 ? "block" : "none" }}
            >
              <i className="fa-solid fa-plane-up text-white mt-1 ms-1 fs-3"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
