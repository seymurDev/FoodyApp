import React from "react";
import MainHeader from "@/components/Client/MainHeader";
import Image from "next/image";
import AboutUs from "../../public/svgs/AboutUs.svg";
import AboutRes from "../../public/svgs/AboutRes.svg";
import AboutCard from "@/components/Admin/AboutCard";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const About_Us = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>Foody | {t("About Us")}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainHeader />
      <div className=" flex flex-col items-center md:items-start md:flex-row md:justify-evenly py-[5vh]">
        <div className="w-8/12 md:w-4/12 font-body tracking-wider">
          <h1 className="capitalize font-semibold text-black dark:text-cyan-300 text-[45px] mb-[5%]">
          {t("About Us")}
          </h1>
          <p className="text-[#828282] dark:text-cyan-300  text-xl font-medium text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Necessitatibus quis adipisci quam atque, consequuntur illum dolorem
            soluta a repudiandae quidem id velit architecto, nesciunt
            voluptatibus. Expedita, inventore eligendi, veniam distinctio quod
            repudiandae ullam unde temporibus magnam reiciendis pariatur
            voluptatem odio culpa eius incidunt. Ducimus, esse.
          </p>
        </div>

        <div className="hidden md:block md:w-4/12 relative">
          <Image
            src={AboutUs}
            alt="AboutUs"
            width={500}
            height={500}
            className="hover:scale-105 transition-all duration-500  object-cover "
          />
          <div className="absolute left-[40%] top-[2%]">
            <AboutCard />
          </div>
          <div className="absolute left-[50%] top-[42%]">
            <AboutCard />
          </div>
          <div className="absolute right-[60%] top-[32%]">
            <AboutCard />
          </div>
          <div className="absolute right-[60%] top-[72%]">
            <AboutCard />
          </div>
        </div>

        <div className="block w-8/12 md:hidden mt-[10%] relative">
          <Image
            src={AboutRes}
            alt="AboutRes"
            width={500}
            height={500}
            className="hover:scale-105 transition-all duration-500  object-cover "
          />
          <div className="absolute  top-[10%]">
            <AboutCard />
          </div>
          <div className="absolute  top-[60%]">
            <AboutCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default About_Us;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
