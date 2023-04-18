import React, { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import Card from "../components/Card";
import Button from "../components/Button";
import BeatLoader from "react-spinners/BeatLoader";
import useDebounce from "../hooks/useDebounce";

export type Employees = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: "IT" | "Finance";
  tel: string;
  isActive: string;
};

const Home = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [employees, setEmployees] = useState<Employees[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredEmployees, setFilteredEmployees] = useState<Employees[]>([]);

  const debouncedSearchQuery = useDebounce({ searchQuery, delay: 300 });

  useEffect(() => {
    setIsLoading(true);

    axios
      .get<Employees[]>("http://localhost:5173/api/employees")
      .then((response: AxiosResponse<Employees[]>) => {
        if (response.status === 200 && response.statusText === "OK") {
          console.log("successfully fetched data");
          setEmployees(response?.data);
        } else {
          throw new Error("No results found");
        }
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setFilteredEmployees(filteredSearchQuery(debouncedSearchQuery, employees));
  }, [debouncedSearchQuery, employees]);

  const filteredSearchQuery = (searchQuery: string, employees: Employees[]) =>
    employees.filter(
      (employee: Employees) =>
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <BeatLoader />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline flex justify-center items-center">
        Home!
      </h1>
      <div className="flex justify-center mt-6 mb-12 w-full">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          className="w-3/4 max-w-2xl py-2 px-3 shadow-xl rounded-md outline-0 border-2 border-transparent focus:border-cyan-500 transition duration-300"
          onChange={handleSearchInput}
        />
        <Button
          handleClick={() => {
            filteredEmployees.map((employee) => console.log(employee));
          }}
        />
      </div>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:w-5/6 md:mx-auto lg:w-3/4 2xl:w-1/2">
        {filteredEmployees.length === 0 ? (
          <p className="col-span-3 justify-self-center text-rose-500">
            No results found!
          </p>
        ) : (
          filteredEmployees.map((employee) => (
            <Card key={employee.id} employee={employee} />
          ))
        )}
      </main>
    </>
  );
};

export default Home;
