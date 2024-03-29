import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSpring, animated } from "react-spring";
import en from "../../../public/svgs/en.svg";
import az from "../../../public/svgs/az.svg";
import fr from "../../../public/svgs/fr.svg";

type Languages = "fr" | "az" | "en" | string;

export const LangSelect: React.FC = () => {

  const router = useRouter();
  const updatedLocale: Languages = router.locale || "en";
  const [currentLang, setCurrentLang] = useState<Languages>("en");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    setCurrentLang(updatedLocale);
  }, [updatedLocale]);

  const dropdownAnimation = useSpring({
    opacity: isDropdownOpen ? 1 : 0,
    transform: isDropdownOpen ? "translateY(0%)" : "translateY(-100%)",
  });

  const changeLang = (language: Languages) => {
    setCurrentLang(language);
    setIsDropdownOpen(false);
    localStorage.setItem("language", language);
  };

  return (

    <div className=" relative  flex flex-col " ref={dropdownRef}>
      <Image
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
        alt="lang"
        className="  hover:scale-110 cursor-pointer transition-all duration-500 mx-3 mt-2 md:mx-0 md:mt-0"
        src={
          currentLang === "en"
            ? en
            : currentLang === "fr"
            ? fr
            : currentLang === "az"
            ? az
            : ""
        }
      />
      {isDropdownOpen && (
        <animated.div
          style={dropdownAnimation}
          className="flex absolute top-[45px] left-[3px] md:-left-[8px] z-30 flex-col  w-12 pl-[9px] pt-3 "
        >
          {currentLang === "en" ? (
            <div >
              <Link href="#" locale="az" onClick={() => changeLang("az")}>
                <Image
                  className=" pb-2 scale-100 hover:scale-110 "
                  src={az}
                  alt="az"
                />
              </Link>
              <Link href="#" locale="fr" onClick={() => changeLang("fr")}>
                <Image
                  className="scale-100 hover:scale-110"
                  src={fr}
                  alt="fr"
                />
              </Link>
            </div>
          ) : currentLang === "az" ? (
            <div>
              <Link href="#" locale="en" onClick={() => changeLang("en")}>
                <Image
                  className="pb-2 scale-100 hover:scale-110 "
                  src={en}
                  alt="en"
                />
              </Link>
              <Link href="#" locale="fr" onClick={() => changeLang("fr")}>
                <Image
                  className=" scale-100 hover:scale-110"
                  src={fr}
                  alt="fr"
                />
              </Link>
            </div>
          ) : currentLang === "fr" ? (
            <div>
              <Link href="#" locale="az" onClick={() => changeLang("az")}>
                <Image
                  className="pb-2 scale-100 hover:scale-110"
                  src={az}
                  alt="az"
                />
              </Link>
              <Link href="#" locale="en" onClick={() => changeLang("en")}>
                <Image
                  className=" scale-100 hover:scale-110"
                  src={en}
                  alt="en"
                />
              </Link>
            </div>
          ) : (
            ""
          )}
        </animated.div>
      )}
    </div>

  );
};
