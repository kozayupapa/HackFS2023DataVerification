import { useState, useEffect } from "react";
import listIcon from "@assets/images/list-icon.png";
import icon1 from "@assets/images/icon1.png";
import icon2 from "@assets/images/icon2.png";
import { Link } from "react-router-dom";
import { getDataset } from "@modules/Shared/Services";
interface IProps {
  data: any;
}
export const FileList = ({ data }: IProps) => {
  const [dataList, setDataList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      setDataList(data.files);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    console.log(dataList);
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KiB",
      "MiB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-[40%] w-full lg:w-[80%]  border-2 border-black pt-4 py-2 px-4 rounded-lg ">
      <section className="h-[90%] w-full  px-2">
        <div className="flex text-md lg:text-2xl ">
          <div className="font-bold  w-[10%]  px-2">Logo</div>
          <div className="font-bold  w-[40%] px-2">file Name</div>
          <div className="font-bold  w-[15%] px-2">size</div>
          <div className="font-bold  w-[15%] px-2">DealID</div>
          <div className="font-bold  w-[20%] px-2">link</div>
        </div>
        {isLoading && (
          <div className="text-md font-bold text-center mt-10">
            Loading Files...
          </div>
        )}

        {!isLoading &&
          dataList.map((item: any, idx: any) => (
            <div
              key={idx}
              className="flex text-md my-4 border-2 border-gray-300 py-5 cursor-pointer hover:shadow-md  shadow-black"
            >
              <div className="  w-[10%]  px-2">
                <img src={listIcon} />
              </div>
              <div className="text-lg flex items-center w-[40%] px-2">
                {item.filename}
              </div>
              <div className="text-lg flex items-center  w-[15%] px-2">
                {formatBytes(item.data_size)}
              </div>
              <div className="text-lg flex items-center  w-[15%] px-2">
                {data.source == "Filecoin" ? item.deal_id : "--"}
              </div>
              <div className=" text-lg flex space-x-2 overflow-x-auto items-center w-[20%]  px-2">
                <a
                  href={
                    data.source == "Filecoin"
                      ? `https://mysaturn.trusteddatagraph.dev/ipfs/${
                          item.payload_cid
                        }?format=car&protocols=graphsync&providers=${
                          item.miner_multi_addrs.split(" ")[0]
                        }/p2p/${item.miner_peer}`
                      : `https://mysaturn.trusteddatagraph.dev/ipfs/${item.payload_cid}?format=car`
                  }
                >
                  Download
                </a>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};
