import React, { ChangeEvent, FormEvent } from "react";
import { useState, useContext } from "react";
import { CiSearch } from "react-icons/ci";
import HomeCard from "./HomeCard";
import { DataContext } from "../../Context/DataProvider";
import Pagination from "../../common/Pagination";

const Home: React.FC = () => {
  const spaceXData = useContext(DataContext);
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [launchStatusFilter, setLaunchStatusFilter] = useState<string | null>(
    null
  );
  const [launchDateFilter, setLaunchDateFilter] = useState<string | null>(null);

  const filterLaunchByDate = (launchDate: string, filter: string): boolean => {
    const launchDateTime = new Date(launchDate);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - launchDateTime.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    switch (filter) {
      case "week":
        return daysDifference <= 7;
      case "month":
        return daysDifference <= 30;
      case "year":
        return daysDifference <= 365;
      default:
        return true;
    }
  };

  const filteredSpaceXData = spaceXData
    .filter((launch) => !showUpcomingOnly || launch.upcoming)
    .filter((launch) =>
      launchStatusFilter
        ? launch.launch_success === (launchStatusFilter === "success")
        : true
    )
    .filter((launch) =>
      launchDateFilter
        ? filterLaunchByDate(launch.launch_date_utc, launchDateFilter)
        : true
    )
    .filter((launch) =>
      launch.rocket.rocket_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSpaceXData = filteredSpaceXData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCheckboxChange = () => {
    setShowUpcomingOnly(!showUpcomingOnly);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleLaunchStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLaunchStatusFilter(
      event.target.value !== "all" ? event.target.value : null
    );
    setCurrentPage(1);
  };

  const handleLaunchDateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLaunchDateFilter(
      event.target.value !== "all" ? event.target.value : null
    );
    setCurrentPage(1);
  };

  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-12 lg:px-8 lg:pt-20">
      <div className="sm:text-center mb-[64px] sm:mb-0">
        <h1 className="text-[40px] font-medium mb-4 sm:mb-1">
          SpaceFlight details
        </h1>
        <p className="text-[#495057]">
          Find out the elaborate features of all the past big spaceflights
        </p>
      </div>
      <div className="hidden sm:flex sm:justify-end items-center gap-2 mt-[64px] mb-[16px]">
        <input
          type="checkbox"
          className="border border-gray-50 rounded-lg w-4 h-5"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="">Show upcoming only</label>
      </div>
      <div
        className="flex flex-col sm:flex-row sm:justify-between sm:items-end
       space-y-4 sm:space-y-0"
      >
        <form
          className="flex justify-start items-center"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="search"
            name=""
            placeholder="Search by Rocket Name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full lg:w-[382px] sm:max-w-[382px] h-[38px] rounded-l-[4px] px-4 border outline-[#86B7FE] focus:border-[#86B7FE]"
          />
          <button
            type="submit"
            className="bg-[#0D6EFD] text-white rounded-r-[4px] w-[38px] h-[38px] flex justify-center items-center"
          >
            <CiSearch className="w-5 h-5" />
          </button>
        </form>
        <div className="sm:hidden flex sm:justify-end items-center gap-2 sm:mt-[64px] sm:mb-[16px]">
          <input
            type="checkbox"
            className="border border-gray-50 rounded-lg w-4 h-5"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="">Show upcoming only</label>
        </div>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4">
          <select
            id="launchStatus"
            className="w-full sm:w-auto lg:w-[256px] sm:max-w-[256px] h-[38px] rounded-[4px] px-4 border outline-[#86B7FE] focus:ring focus:border-[#86B7FE]"
            onChange={handleLaunchStatusChange}
          >
            <option value="all">By Launch Status</option>
            <option value="success">Success</option>
            <option value="failure">Failure</option>
          </select>
          <select
            id="launchDate"
            className="w-full sm:w-auto lg:w-[256px] sm:max-w-[256px] h-[38px] rounded-[4px] px-4 border outline-[#86B7FE] focus:ring focus:border-[#86B7FE]"
            onChange={handleLaunchDateChange}
          >
            <option value="all">By Launch Date</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>
      <div className="my-[64px]">
        {currentSpaceXData.length === 0 ? (
          <p className="text-center text-[#495057] mt-4">
            Data Not Found. Try adjusting your filters or search.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[40px]">
            {currentSpaceXData.map((launch) => (
              <HomeCard key={launch.flight_number} launch={launch} />
            ))}
          </div>
        )}
      </div>
      <center>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={spaceXData.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </center>
      <footer className="text-center mt-[80px] mb-10">
        Created by the brilliant minds behind SpaceX
      </footer>
    </div>
  );
};

export default Home;
