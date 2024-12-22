import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ButtonComponent from "../Components/ButtonComponent";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://prod-29.northcentralus.logic.azure.com:443/workflows/2d74d9d9ec2e41dda2723fbefae71850/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=j1gQ_YW2lFzfBEfpuLRG8RrIc0IDv8mVaFEbpxuZleU"
          );
          const result = await response.json();
          const apiData = result.map((item) => {
            return {
              title: atob(item.title.$content),
              user: atob(item.userName.$content),
              location: atob(item.location.$content),
              filePath: item.filePath,
              description: atob(item.description.$content)
            };
          });
          setData(apiData);
        } catch (error) {
          // console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
    return (
      <>
        <div className="flex w-[90vw] justify-between mx-auto my-8">
          <h1 className="font-bold text-2xl font-primary text-primary-100">
            travelgram.
          </h1>
        <ButtonComponent name="upload" handleClick={() => navigate('/upload')} />
        </div>
  
        <div className="w-[90vw] mx-auto">
          <div className="columns-3 gap-4">
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      height={400}
                      className="rounded-lg mb-4"
                    />
                  ))
              : data.map((item, index) => (
                  <div key={index} className="mb-4 relative group">
                    <img
                      src={"https://blobstoragetravelgram.blob.core.windows.net" + item.filePath}
                      alt=""
                      className="w-full h-auto object-cover rounded-lg shadow-lg min-h-[400px]"
                    />
  
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-lg overflow-clip">
                      <h1 className="text-white text-3xl font-bold mb-2">
                        {item.title}
                      </h1>
  
                      <p className="text-white text-lg font-medium mb-2">
                        Uploaded By
                      </p>
                      <h3 className="text-white text-xl font-bold mb-2">
                        {item.user}
                      </h3>
                      <div className="flex space-x-4 py-6">
                        <button className="p-2 rounded-full hover:bg-black hover:text-white transition-all duration-500 ease-in-out">
                          <div className="p-2  flex flex-col gap-2">
                            <img src="likes-logo-filled.png" alt="" />
                            <p className="text-center text-white text-bold py-2">{Math.floor(Math.random()*20)}</p>
                          </div>
                        </button>
                        <button className="p-2 rounded-full hover:bg-black hover:text-white transition-all duration-500 ease-in-out">
                          <div className="p-2 flex flex-col gap-2">
                            <img src="comment-logo.png" alt="" />
                            <p className="text-center text-white text-bold py-2">
                              {Math.floor(Math.random()*20)}
                            </p>
                          </div>
                        </button>
                      </div>
  
                      <div className="mx-auto px-6">
                        <p className="text-white">
                          {item.description.length > 100
                            ? item.description.substring(0, 100) + "..."
                            : item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </>
    );
}



export default HomePage