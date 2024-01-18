import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile Page | Next.js E-commerce Dashboard Template",
  description: "This is Profile page for TailAdmin Next.js",
  // other metadata
};
interface Params{
  /*id: number;*/
}
const Profile: React.FC<Params> = () => {
  
  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src={"/images/cover/cover-01.png"}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            width={970}
            height={260}
          />
         
        </div>
      </div>
    </>
  );
};

export default Profile;
