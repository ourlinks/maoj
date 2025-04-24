import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./Detail.css";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; // استخدم getDoc لجلب وثيقة واحدة
import { db } from "../../FireBase/firebase";

const Detail = () => {
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
        <div className="detail2 p-3 ">
          <div className="container detail-box mb-5  ">
            <h3 className="mb-4 text-center">
              <span className="title-main fw-bold"> {data.title}</span>
            </h3>
            <p
              className="fs-4"
              dangerouslySetInnerHTML={{ __html: data.d1 }}
            ></p>
            <div className="row w-100  mx-auto justify-content-center ">
              <div
                id="carouselExampleIndicators"
                className="carousel slide "
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={data.url} className="d-block w-100" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src={data.url2} className="d-block w-100" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src={data.url3} className="d-block w-100" alt="" />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>

            <p
              className="fs-4"
              dangerouslySetInnerHTML={{ __html: data.d2 }}
            ></p>
            <div className="text-center my-4">
              <video
                controls
                className="w-100"
                style={{ maxHeight: "500px", borderRadius: "10px" }}
              >
                <source src={data.videourl} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
