import { useState, useEffect } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  getReportsByDataset,
  getReport,
  getReviewerInfo,
  getReportReviewer,
} from "@modules/Shared/Services";

interface IProps {
  data: any;
  datasetid: number;
}
export const VerificationList = ({ data, datasetid }: IProps) => {
  const [dataList, setDataList] = useState<any>([]);
  const [idList, setIdList] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  //console.log(datasetid);
  const getData = async () => {
    try {
      const ids = await getReportsByDataset(datasetid);
      console.log(ids);
      setIdList([Number(ids)]);

      const data = [];
      for (let i = 0; i < ids.length; i++) {
        const reportId = Number(ids[i]);
        const uri = await getReport(reportId);
        const revId = Number(await getReportReviewer(reportId));
        const reviewer = await getReviewerInfo(revId);
        data.push({ uri, reviewer, reviewerId: revId });
      }
      //console.log(data);
      setDataList(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [data]);

  return (
    <div className="h-[40%] w-full lg:w-[80%]  border-2 border-black pt-4 py-2 px-4 rounded-lg">
      <ol className="block h-[90%] list-decimal w-full py-4 pt-6 overflow-y-auto ">
        {/* // {idList.map((id, idx) => (
        //   <ReviewDisplayList key={idx} reviewId={id} />
        // ))} */}
        {isLoading && (
          <li className="text-md font-bold text-center mt-10">
            Loading Reports...
          </li>
        )}
        {!isLoading &&
          dataList.map((item: any, idx: any) => (
            <li key={idx} className="flex space-x-4">
              <div className="w[10%] text-lg">{idx + 1}.</div>
              <div className="w-[55%] text-lg">{item.reviewer.name}</div>
              <div className="w-[10%] flex items-center text-green-500 ">
                <AiFillCheckCircle size={20} />
              </div>
              <div className="w-[25%] text-sm flex justify-between items-center">
                <small className="text-sm text-linkBlue font-semibold  underline">
                  <a href={item.uri} target="_blank" rel="noopener noreferrer">
                    View Report
                  </a>
                </small>
                <small className="text-sm text-linkBlue font-semibold  underline">
                  <Link to={`/reviewer/${item.reviewerId}`}>
                    View Verifier!
                  </Link>
                </small>
              </div>
            </li>
          ))}

        {/* <li className="flex space-x-4">
          <div className="w[10%] text-lg">3.</div>
          <div className="w-[55%] text-lg">UCLA</div>

          <div className="w-[10%] flex items-center text-yellow-500 ">
            <RiErrorWarningLine size={20} />
          </div>

          <div className="w-[25%] text-sm flex justify-between items-center">
            <small className="text-sm text-linkBlue font-semibold  underline">
              View Report
            </small>

            <small className="text-sm text-linkBlue font-semibold  underline">
              View Verifier
            </small>
          </div>
        </li> */}
      </ol>
    </div>
  );
};
