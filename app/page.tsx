"use client";
import {
  CarCard,
  CustomFilters,
  Hero,
  SearchBar,
  ShowMore,
} from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils";
import { useEffect, useState } from "react";

export default function Home({ searchParams }: HomeProps) {
  const [allCars, setAllCars] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllCars = async () => {
      const cars = await fetchCars({
        manufacturer: searchParams.manufacturer || "",
        year: searchParams.year || 2022,
        fuel: searchParams.fuel || "",
        limit: searchParams.limit || 10,
        model: searchParams.model || "",
      });
      setAllCars(cars);
      setIsLoading(false);
    };

    fetchAllCars();
  }, [searchParams]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="overflow-hidden ">
      <Hero />

      <div className="mt-12 max-width padding-x padding-y" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilters title="fuel" options={fuels} />
            <CustomFilters title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
