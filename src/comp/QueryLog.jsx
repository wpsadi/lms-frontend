/* eslint-disable react/prop-types */
import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";

import { FaExternalLinkAlt } from "react-icons/fa";
import stringy from "string";
import {useNavigate } from "react-router-dom";

function QueryLogTable({ queries, reload }) {
  const [searchText, SetSearchText] = useState("");
  const [chosedFilter, setChosedFilter] = useState("all");

  //   const limit = 3;

  const [limit, setLimit] = useState(10);
  const AvailLimts = [10, 25, 50];

  const [isLimitUpdated, setIsLimitUpdated] = useState(false);

  const navigate = useNavigate()

  const queriesStatusAttribute = [
    "all",
    "pending",
    "resolved",
    "junk",
    "discarded",
  ];

  useEffect(() => {
    let UpdatedData;

    if (isLimitUpdated === true) {
      setStart(0);
      setEnd(
        queries.documents.length >= limit
          ? limit
          : queries.documents.length % limit
      );
      setIsLimitUpdated(false);
    }

    if (chosedFilter === "all") {
      UpdatedData = queries.documents;
    } else {
      UpdatedData = queries.documents.filter(
        (query) => query.status === chosedFilter
      );
    }

    if (searchText !== "") {
      UpdatedData = UpdatedData.filter((query) =>
        query.$id.includes(searchText)
      );
    }

    setStart(0);
    setEnd(UpdatedData.length >= limit ? limit : UpdatedData.length % limit);

    setData(UpdatedData);
  }, [searchText, chosedFilter, queries.documents, limit, isLimitUpdated]);

  const [data, setData] = useState(queries.documents);
  //   console.log(data,queries)

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(
    start + (data.length - start >= limit ? limit : data.length % limit)
  );

  const parameters = queries.parameters;

  //   console.log("parameters", parameters)
  const TableAttributes = ["Sr No.", ...parameters, "Actions"];
  // const attributes = new Array.from(new Object(data[0]).keys());
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          {/* <!-- Start coding here --> */}
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-2/3">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      onInput={(evt) => {
                        SetSearchText(evt.target.value);
                      }}
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search with $ID"
                      required=""
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex gap-3 items-start">
                  <div className="flex items-center space-x-3 w-fit md:w-auto bg-red-500 rounded-md">
                    <Dropdown
                      label={`Limit : ${limit}`}
                      className="rounded-md flex justify-center w-fit"
                      dismissOnClick={true}
                    >
                      {AvailLimts.map((limitVal, index) => (
                        <Dropdown.Item
                          className="w-full"
                          key={index}
                          onClick={() => {
                            setLimit(limitVal);
                            setIsLimitUpdated(true);
                          }}
                        >
                          {limitVal}
                        </Dropdown.Item>
                      ))}
                    </Dropdown>
                  </div>
                  <div className="flex items-center space-x-3 w-fit md:w-auto bg-blue-500 rounded-md">
                    <Dropdown
                      label={`Filter${(() => {
                        if (chosedFilter === "all") {
                          return "";
                        } else {
                          return ` : ${(() => {
                            return stringy(chosedFilter).capitalize().s;
                          })()}`;
                        }
                      })()}`}
                      className="rounded-md flex justify-start "
                      dismissOnClick={true}
                    >
                      {queriesStatusAttribute.map((status, index) => (
                        <Dropdown.Item
                          className="w-full"
                          key={index}
                          onClick={() => {
                            setChosedFilter(status);
                            // reload(false)
                          }}
                        >
                          {(() => {
                            const s = stringy(status).capitalize().s;

                            return s;
                          })()}
                        </Dropdown.Item>
                      ))}
                    </Dropdown>
                  </div>

                  <div className="flex items-center space-x-3 w-fit md:w-auto  rounded-md">
                    <button
                      type="button"
                      onClick={() => {
                        reload(false);
                      }}
                      className="py-2.5 text-xl px-5 me-2 mb-2  font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      <IoReload className={(() => {})()} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {TableAttributes.map((attribute, index) => (
                      <th scope="col" className="px-4 py-3" key={index}>
                        {attribute}
                      </th>
                    ))}

                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only"></span>
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {data.slice(start, end).map((query, index) => {
                    return (
                      <tr 
                      onClick={()=>{
                        navigate(`/queries/${query[parameters[0]]}`)
                      }}
                        key={index}
                        className={`border-b w-full dark:border-gray-700 ${(() => {
                          if (query.status === "resolved") {
                            return "bg-green-400 text-white";
                          } else if (query.status === "discarded") {
                            return "bg-red-600 text-white";
                          } else if (query.status === "junk") {
                            return "bg-yellow-400 text-white";
                          } else if (query.status === "pending") {
                            return "bg-blue-400 text-white";
                          }
                        })()}`}
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium  whitespace-nowrap dark:text-white"
                        >
                          {index + 1}
                        </th>
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium  whitespace-nowrap dark:text-white"
                        >
                          {query[parameters[0]]}
                        </th>
                        {new Array(parameters.length - 1)
                          .fill("")
                          .map((_, index) => (
                            <td className="px-4 py-3 " key={index}>
                              <div className="dropdown dropdown-hover">
                                <div
                                  tabIndex={0}
                                  role="button"
                                  className="  z-10 "
                                >
                                  {" "}
                                  <p className="line-clamp-2">
                                    {(() => {
                                      if (
                                        parameters[index + 1] === "$createdAt"
                                      ) {
                                        return new Date(
                                          query[parameters[index + 1]]
                                        ).toLocaleString();
                                      } else if (
                                        parameters[index + 1] === "status"
                                      ) {
                                        return query[
                                          parameters[index + 1]
                                        ].toUpperCase();
                                      }
                                      return String(
                                        query[parameters[index + 1]] ?? "null"
                                      );
                                    })()}
                                  </p>
                                </div>
                                <div
                                  tabIndex={0}
                                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-black"
                                >
                                  {
                                    stringy(parameters[index + 1]).capitalize()
                                      .s
                                  }
                                </div>
                              </div>
                            </td>
                          ))}
                        <td className="px-4 py-3 flex items-center justify-center flex-col bg-red-400">
                          <button
                            id="apple-imac-27-dropdown-button hidden"
                            data-dropdown-toggle="apple-imac-27-dropdown"
                            className=" p-0.5 py-4 text-sm font-medium text-center  hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                            type="button"
                          >
                            <FaExternalLinkAlt />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white">
                  {` ${start + 1}-${end} `}
                </span>
                of
                <span className="font-semibold text-gray-900 dark:text-white">
                  {` ${data.length}`}
                </span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <button
                    className="btn"
                    disabled={(() => {
                      if (start < 1) {
                        return true;
                      }
                      return false;
                    })()}
                    onClick={() => {
                      setStart(start - limit);
                      setEnd(end - limit);
                    }}
                  >
                    <a className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <span className="sr-only">Previous</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </button>
                </li>

                <li>
                  <button
                    className="btn "
                    disabled={(() => {
                      if (end >= data.length) {
                        return true;
                      }
                      return false;
                    })()}
                    onClick={() => {
                      setStart(start + limit);
                      setEnd(
                        end +
                          (data.length - end >= limit
                            ? limit
                            : data.length % limit)
                      );
                    }}
                  >
                    <a className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <span className="sr-only">Next</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}

export default QueryLogTable;
