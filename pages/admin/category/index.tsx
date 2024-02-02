import React, { useState } from "react";
import Layout from "@/components/Admin/Layout";
import Image from "next/image";
import hamburger from "../../../public/svgs/hamburger.svg";
import editIcon from "../../../public/svgs/edit.svg";
import deleteIcon from "../../../public/svgs/delete2.svg";
import SearchBar from "@/components/Admin/SearchBar";
import {
  SidebarContextProps,
  CategoryPostDataType,
} from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import EditModal from "@/components/Admin/Modals/EditModal";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getCategory } from "../../../services/index";
import { useQuery } from "react-query";
import { QUERIES } from "../../../constant/Queries";
import usePagination from "@/components/Admin/Pagination";
import PaginationControls from "@/components/Admin/Pagination/PaginationControls";

type SortingValue = "A-Z" | "Z-A" | "Low-to-High" | "High-to-Low";

const Category: React.FC = () => {
  const { setShow, setshowDelete, setEditedCategory, setDeletedCategory } =
    useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");
  const [sortingValue, setSortingValue] = useState<SortingValue>("A-Z");
  const resetSorting = () => {
    setSortingValue("A-Z");
  };
  const { data, isLoading, isError } = useQuery(
    QUERIES.Categories,
    getCategory
  );

  const categoryData = data?.data.result.data;
  const { currentPage, currentData, totalPages, nextPage, prevPage, goToPage } =
    usePagination(categoryData, 3);

  const handleSortProducts = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingValue(event.target.value as SortingValue);
  };

  const sortedProducts: CategoryPostDataType[] = [...(currentData || [])];
  if (sortingValue === "A-Z") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortingValue === "Z-A") {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  const openModal = (category: CategoryPostDataType | null) => {
    setShow(true);
    setEditedCategory(category);
  };
  const openDeleteModal = (category: CategoryPostDataType | null) => {
    setshowDelete(true);
    setDeletedCategory(category);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <Layout>
      <div className="bg-bgc h-screen px-12 md:px-6 ">
        <SearchBar />

        <div className="w-full flex items-center mb-6">
          <select
            className="pl-4 py-3  rounded-md w-8/12  md:w-2/12 cursor-pointer bg-[#27283C] text-gray-200 "
            value={sortingValue}
            onChange={handleSortProducts}
          >
            <option value="A-Z">A-Z Name</option>
            <option value="Z-A">Z-A Name</option>
          </select>
          <button
            className="ml-4 px-4 py-[10px] w-3/12  md:w-1/12 rounded-md cursor-pointer bg-[#C74FEB] text-white hover:opacity-75 transition-all duration-500"
            onClick={resetSorting}
          >
            Reset
          </button>
        </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th scope="col" className="pl-16 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("Image")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("Name")}
                </th>

                <th scope="col" className="px-6 py-3">
                  {t("Actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts &&
                sortedProducts.map((category: CategoryPostDataType, index) => {
                  return (
                    <tr
                      key={category.id}
                      className="bg-white border-b dark:bg-[#27283C] dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-700"
                    >
                      <td className="pl-14 py-4 font-semibold text-gray-900 dark:text-white">
                        <p className="flex justify-start items-center">
                          <span>{(currentPage - 1) * 3 + index + 1}</span>
                          <span className="ml-1">
                            - {category.id?.slice(0, 5)}
                          </span>
                        </p>
                      </td>

                      <td className="p-4 ">
                        <Image
                          src={category.img_url ? category.img_url : hamburger}
                          alt={category.name}
                          width={100}
                          height={100}
                          className="hover:scale-105 object-cover transition-all duration-500 w-[75px] h-[50px] rounded-lg"
                        />
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white capitalize">
                        {category.name}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Image
                            src={editIcon}
                            alt="title"
                            onClick={() => openModal(category)}
                            className="hover:scale-110 transition-all duration-500  mr-2  cursor-pointer"
                          />
                          <Image
                            src={deleteIcon}
                            alt="title"
                            onClick={() => openDeleteModal(category)}
                            className="hover:scale-110 transition-all duration-500   cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <EditModal />
          <DeleteModal />
        </div>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
          goToPage={goToPage}
        />
      </div>
    </Layout>
  );
};

export default Category;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});