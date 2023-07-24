import React, { useEffect } from "react";

const useFetchv2 = (query, dispach) => {
  const KEY = "f60ffd91b8244000ba2e9fdb8fd59f61";
  useEffect(() => {
    dispach({ type: "loading", payload: true });
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${KEY}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Something went wrong with fetching data");

        const data = await res.json();

        if (data.features.length === 0) throw new Error("Place not found");

        dispach({ type: "setData", payload: data.features });
      } catch (error) {
        if (error.name !== "AbortError") {
          // dispach({ type: "setData", payload: [] });
          dispach({ type: "error", payload: error.message });
        }
      }
    };
    if (query.length < 2) {
      dispach({ type: "setData", payload: [] });
      return;
    }

    fetchMovies();

    return () => controller.abort();
  }, [query]);
};

export default useFetchv2;
