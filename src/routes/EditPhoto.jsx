import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = (e) => {
    e.preventDefault();
    const data = {
      imageUrl: imageUrl,
      captions: captions,
      updatedAt: "08/09/2022",
    }; 
      fetch(`https://gallery-app-server.vercel.app/photos/${id}`, {
      method: "PATCH", // HTTP method
      headers: {
        // HTTP headers
        "Content-Type": "application/json", // type data yang dikirim
      },
      body: JSON.stringify(data), // data yang dikirim
    })
    .then((res) => res.json())
    .then(() => {
      navigate('/photos')
      setLoading(false)
    })
    .catch((error) => {
      // set error
      setError(error);
      // set loading menjadi false
      setLoading(false);
    });
    // TODO: answer here
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://gallery-app-server.vercel.app/photos/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setImageUrl(response.imageUrl);
        setCaptions(response.captions);
        setLoading(false);
      });
    // TODO: answer here
  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
