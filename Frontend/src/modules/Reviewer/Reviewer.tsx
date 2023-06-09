import { useEffect, useState } from "react";
import Header from "@modules/Shared/layout/Header";
import { ReviewerSummary } from "./features/reviewerSummary";
import { ReviewList } from "./features/reviewList";
import { useParams } from "react-router-dom";
import {
  getReviewerInfo,
  getReviewerReports,
} from "@modules/Shared/Services";
interface IData {
  name: string;
  description: string;
  verification_method: string;
  email: string;
  location: string;
  expertise: string[];
}

export function Reviewer() {
  let { id } = useParams();
  const [reports, setReports] = useState<any>([]);  
  const [data, setData] = useState<IData>({
    name: "",
    description: "",
    verification_method: "",
    email: "",
    location: "",
    expertise: [""],
  });

  const getInfo = async () => {
    const info = await getReviewerInfo(Number(id));
    setData(info);    
    const r = await getReviewerReports(Number(id));
    setReports(r);
    //console.log(r,reports);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="h-full w-full flex flex-col  ">
      <Header />
      <main className="w-full h-[90%]">
        <ReviewerSummary data={data} />
        <ReviewList reports={reports}  />
      </main>
    </div>
  );
}
