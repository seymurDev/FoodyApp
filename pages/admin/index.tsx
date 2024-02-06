import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Admin/Layout/index";
import { data } from "../../components/Admin/Charts/ChartDatas";
import { data2 } from "../../components/Admin/Charts/ChartDatas";
import NotFound from "@/public/svgs/405.gif";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  renderCustomizedLabel,
  COLORS,
} from "../../components/Admin/Charts/ChartFunctions";
import ChartMonths from "../../components/Admin/Charts/ChartMonths";
import { ChartWeek } from "../../components/Admin/Charts/ChartDays";
import { SidebarContextProps } from "@/interfaces";
import { useSidebarContext } from "@/contexts/SidebarContext";
import Image from "next/image";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard: NextPage = () => {
  const { isAdmin } = useSidebarContext() as SidebarContextProps;

  const { t } = useTranslation("common");
  return (
    <div>
      <div>
        {isAdmin ? (
          <>
            <Head>
              <title>Foody | Admin</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
              <div className="flex flex-wrap justify-center md:justify-evenly md:px-5 pb-4  bg-bgc">
                <div className="w-full md:w-5/12 flex flex-col justify-center p-3  py-8 pl-5  rounded-[14px] bg-bgg mb-[6%] md:mb-[3%]">
                  <h1 className="text-gray1 text-xl font-medium capitalize mb-2 md:mb-0">
                    {t("Orders")}
                  </h1>
                  <Doughnut data={data} />
                </div>

                <div className="w-full md:w-6/12 mb-[6%] md:mb-[3%] p-3  md:p-5   flex flex-col rounded-[14px] bg-bgg">
                  <h1 className="text-gray1 text-xl font-medium capitalize">
                    {t("Total Salary")}
                  </h1>
                  <ChartMonths />
                </div>

                <div className="w-full md:w-7/12 mb-[6%] md:mb-[3%] p-3  md:p-5 flex flex-col   rounded-[14px] bg-bgg">
                  <h1 className="text-gray1 text-xl font-medium capitalize pb-4">
                    {t("Weekly Sales Rate")}
                  </h1>

                  <ChartWeek />
                </div>

                <div className="w-full md:w-4/12  mb-[6%] md:mb-[3%] p-3  md:p-5 flex flex-col rounded-[14px] bg-bgg ">
                  <h1 className="text-gray1 text-xl font-medium capitalize ">
                    {t("Users Rate")}
                  </h1>
                  <div className="text-gray1 text-2xl font-medium capitalize text-center flex items-center justify-around py-4 ">
                    <p className="text-[#66b7ff]">{t("Male")}</p>
                    <p className=" text-[#ff4242]">{t("Female")}</p>
                    <p className="text-[#3ccc03]">{t("Kids")}</p>
                  </div>

                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={600} height={600}>
                      <Pie
                        data={data2}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {data2.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Layout>
          </>
        ) : (
          <Image
            alt="NotFound"
            height={1000}
            width={1000}
            className="h-screen w-screen"
            src={NotFound}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
