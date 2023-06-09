import { useEffect, useState } from "react";
import Header from "@modules/Shared/layout/Header";
import { DataSummary } from "./features/dataSummary";
import { VerificationList } from "./features/verificationList";
import { FileList } from "./features/fileList";
import { useParams } from "react-router-dom";
import { getDataset } from "@modules/Shared/Services";

export function DataActivities() {
  let { id } = useParams();

  const [data, setData] = useState<any>({});
  const [activeTab, setActiveTab] = useState("review");

  const getData = async () => {
    let data1 = await getDataset(Number(id));

    try {
      let res1 = await fetch(data1[0]);

      let info1 = await res1.json();

      setData(info1);
      console.log(info1);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (typeof id == "string") getData();
  }, [id]);
  return (
    <div className="h-full w-full flex flex-col ">
      <Header />

      <main className="w-full h-[90%]">
        {Object.keys(data).length == 0 && (
          <div className="text-md font-bold text-center mt-10">
            Loading Data detail...
          </div>
        )}
        {Object.keys(data).length > 0 && (
          <>
            <DataSummary data={data} datasetid={Number(id)} />

            <div className="p-6  rounded-lg shadow-lg">
              <div className="flex">
                <div
                  className={`w-1/5 h-8 text-xl  items-center text-center cursor-pointer  ${
                    activeTab === "review" ? "bg-gray-200" : ""
                  }`}
                  onClick={() => setActiveTab("review")}
                >
                  <span>Reviews</span>
                </div>
                <div
                  className={`w-1/5 h-8 text-xl text-center cursor-pointer ${
                    activeTab === "file" ? "bg-gray-200 " : ""
                  }`}
                  onClick={() => setActiveTab("file")}
                >
                  <span>Files</span>
                </div>
              </div>
              <div
                className={`w-full p-4 text-center rounded-b-lg bg-white shadow-inner  ${
                  activeTab === "review" ? "" : "hidden"
                }`}
              >
                <VerificationList data={data} datasetid={Number(id)} />
              </div>
              <div
                className={`w-full p-4 text-center rounded-b-lg bg-white shadow-inner ${
                  activeTab === "file" ? "" : "hidden"
                }`}
              >
                <FileList data={data} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
