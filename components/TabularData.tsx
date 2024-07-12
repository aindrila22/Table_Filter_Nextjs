"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Columns from "./Columns";
import { MusicalNoteIcon } from "@heroicons/react/20/solid";

const TabularData = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/vehicles");
        const data = await response.json();
        setData(data.limitedResults);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(data);
  return (
    <div>
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <label>
            {" "}
            <div className=" flex items-center gap-4 text-3xl my-14 px-6">
              <MusicalNoteIcon className="h-12 w-12 text-gray-400" />
              <label className="text-green-400">
                Most Streamed Spotify Songs 2024
              </label>
              <label className="text-gray-400">(Tabular Data)</label>
            </div>
          </label>
        </div>
        {loading ? (
          <div className="pt-20 grid place-items-center">
            <Image
              src={"/loading.gif"}
              alt="loading..."
              width={80}
              height={80}
            />
          </div>
        ) : (
          <div className="grid place-items-center max-w-7xl mx-auto w-full px-5 md:px-0">
            <Columns data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TabularData;
