import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const UploadPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    title: "",
    location: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

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
    if (selectedImage) {
      data.append("File", selectedImage);
    }

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://prod-20.northcentralus.logic.azure.com:443/workflows/8a71e54788ed458a820fa0f78ef0057e/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=2dDhi-h6KCL_Htpu2L32KXAY3T5LMo4TJyZY5m7yWIE",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      // console.log(JSON.stringify(response.data));
      navigate("/home");
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col bg-primary-100">
      <div className="flex w-[90vw] justify-between mx-auto my-8">
        <h1 className="font-bold text-2xl font-primary text-white">
          travelgram.
        </h1>
        <Link to="/home">
          <img src="./home-logo.png" alt="Home" />
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
                  <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="rounded-xl" />
                ) : (
                  <>
                    <img src="upload-image-logo.png" alt="" />
                    <p className="text-gray-500">
                      Drag & Drop your image here or click to upload
                    </p>
                  </>
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="absolute opacity-0 cursor-pointer w-full h-full"
                  required
                />
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
                  Submit
                </p>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};



export default UploadPage;