"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Input, Pagination, CircularProgress } from "@nextui-org/react";
import { FaSort, FaSearch } from "react-icons/fa";
import { useTutors } from "../_providers/tutorsProvider";
import TutorCard from "./tutorCard";

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
    setSort,
    fetchTutors,
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
    fetchTutors(); // Optionally re-fetch the sorted data
  };

  const onClear = useCallback(() => {
    setFilter("");
    setCurrentPage(0);
  }, []);

  const TopContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Input
          isClearable
          type="text"
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<FaSearch />}
          value={filter}
          onClear={() => {
            onClear();
          }}
          onChange={handleFilterChange}
        />
        Cantidad de datos por página:
        <select
          className="bg-transparent outline-none text-default-400 text-small"
          onChange={(event) => handlePageSize(Number(event.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    );
  }, [filter, pageSize]);

  return (
    <div className="w-full">
      {TopContent}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {tutors.map((tutor) => (
          <TutorCard key={tutor.email} tutor={tutor} />
        ))}
      </div>
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
  );
};

export default TutorsList;
