"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Input, Pagination, CircularProgress } from "@nextui-org/react";
import { FaSort, FaSearch } from "react-icons/fa";
import { useTutors } from "../_providers/tutorsProvider";
import TutorCard from "./tutorCard";
import SubjectsFilter from "./subjectsFilter";

const TutorsList = () => {
  const {
    tutors,
    totalPages,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    filter,
    setFilter,
    sort,
    setSort
  } = useTutors();

  if (!tutors) {
    return <CircularProgress aria-label="Loading..." />;
  }

  const handlePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const handleFilterChange = (e: { target: { value: any } }) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (field: string) => {
    // Toggle between 'asc' and 'desc'
    const order = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order });
  };

  const onClear = useCallback(() => {
    setFilter("");
    setCurrentPage(0);
  }, []);

  const TopContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex flex-col md:flex-row justify-between items-center gap-4">
        <Input
          isClearable
          type="text"
          className="w-full md:w-[44%]"
          placeholder="Buscar por nombre..."
          startContent={<FaSearch />}
          value={filter}
          onClear={onClear}
          onChange={handleFilterChange}
        />
        <div className="flex items-center gap-2">
          <label className="text-default-600 dark:text-default-400">
            Cantidad de datos por página:
          </label>
          <select
            className="bg-transparent outline-none text-default-600 dark:text-default-400"
            onChange={(event) => handlePageSize(Number(event.target.value))}
            value={pageSize}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      </div>
    );
  }, [filter, pageSize]);

  return (
    <div className="w-full p-4">
      {TopContent}
      <div className="flex flex-wrap justify-center gap-4">
        <SubjectsFilter />
        {tutors.map((tutor) => (
          <TutorCard key={tutor.email} tutor={tutor} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination
          isCompact
          showControls
          showShadow
          total={totalPages}
          initialPage={1}
          color="secondary"
          page={currentPage + 1}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TutorsList;
