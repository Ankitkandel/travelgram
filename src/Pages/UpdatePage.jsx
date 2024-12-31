import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import homeLogo from "/public/home-logo.png";

const UpdatePage = ( ) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    title: "",
    location: "",
    description: "",
    id: ""
  });
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("username", formData.username);
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("id", formData.id);
    if (selectedImage) {
      data.append("filePath", selectedImage);
    }

    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "https://prod-16.northcentralus.logic.azure.com:443/workflows/9f01d456cfef402e8a4096c11173cea1/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=QxSiYJQ-BXPue_dj9zQ2MtG7QCucdxgQQ0XbsxnX_jQ",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      // console.log(JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    setLoadingDelete(true);

    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: "https://prod-04.northcentralus.logic.azure.com:443/workflows/d738535164fa4d6abcbfe11e43173a74/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=QAWS5JKEUJkzINskwerwBa2DlR2iXcOHCxxWLkdv3Gk",
      // query params
        params: {
            id: formData.id,
            filePath: selectedImage
        },
    };

    try {
      const response = await axios.request(config);
      // console.log(JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      // console.log(error);
    } finally {
      setLoadingDelete(false);
    }
  };


    useEffect(() => {

        if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://prod-29.northcentralus.logic.azure.com:443/workflows/2d74d9d9ec2e41dda2723fbefae71850/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=j1gQ_YW2lFzfBEfpuLRG8RrIc0IDv8mVaFEbpxuZleU"
          );
          const result = await response.json();
          const apiData = result.filter((item)=>item.id === id).map((item) => {
            return {
              id: item.id,
              title: atob(item.title.$content),
              user: atob(item.userName.$content),
              location: atob(item.location.$content),
              filePath: item.filePath,
              description: atob(item.description.$content)
            };
          });

          setSelectedImage(apiData[0].filePath);
          setFormData({
            id: apiData[0].id,
            username: apiData[0].user,
            title: apiData[0].title,
            location: apiData[0].location,
            description: apiData[0].description,
          });

        } catch (error) {
          // console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
    }, [id]);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col bg-primary-100">
      <div className="flex w-[90vw] justify-between mx-auto my-8">
        <h1 className="font-bold text-2xl font-primary text-white">
          travelgram.
        </h1>
        <Link to="/">
          <img src={homeLogo} alt="Home" />
        </Link>
      </div>

      <div className="mx-auto my-8">
        <h1 className="text-5xl text-white w-[60vw] text-center">
          Share your Travels with the World
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="w-[80vw] mx-auto bg-white rounded-xl">
          <div className="flex flex-col gap-4 my-8 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <input
                  name="username"
                  type="text"
                  placeholder="Your Name"
                  value={formData.username}
                  onChange={handleChange}
                  className="p-4 bg-white rounded-xl border-2 border-primary-100"
                  required
                />
                <input
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="p-4 bg-white rounded-xl border-2 border-primary-100"
                  required
                />
                <input
                  name="location"
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="p-4 bg-white rounded-xl border-2 border-primary-100"
                  required
                />
              </div>

              <div className="relative w-full border-2 border-primary-100 flex flex-col items-center justify-center rounded-xl bg-white hover:bg-primary-25">
                {selectedImage ? (
                  <img src={"https://blobstoragetravelgram.blob.core.windows.net" + selectedImage} alt="Selected" className="rounded-xl" />
                ) : (
                  <>
                    <img src="upload-image-logo.png" alt="" />
                    <p className="text-gray-500">
                      Drag & Drop your image here or click to upload
                    </p>
                  </>
                )}
              </div>
            </div>

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="p-4 bg-white rounded-xl border-2 border-primary-100"
              required
            ></textarea>

            <button
              type="submit"
              className="group px-4 py-2 border-2 border-primary-100 rounded-2xl transition-all duration-500 ease-in-out hover:bg-primary-100"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color={"#ffffff"} loading={loading} size={24} />
              ) : (
                <p className="text-primary-100 text-xl font-bold uppercase tracking-widest group-hover:text-white">
                  Update
                </p>
              )}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="group px-4 py-2 border-2 border-primary-100 rounded-2xl transition-all duration-500 ease-in-out hover:bg-primary-100"
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <ClipLoader color={"#ffffff"} loading={loadingDelete} size={24} />
              ) : (
                <p className="text-primary-100 text-xl font-bold uppercase tracking-widest group-hover:text-white">
                  Delete
                </p>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};



export default UpdatePage;