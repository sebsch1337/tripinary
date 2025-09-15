import { useEffect } from "react";
import Input from "./Input";

export default function SearchInput() {
  const searchExternalLocation = async (searchString) => {
    const sanitizedSearchString = searchString.replaceAll(" ", "+");
    const searchUrl = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=de&addressdetails=1&q=${sanitizedSearchString}`;

    const response = await fetch(searchUrl);
    if (response.ok) {
      const result = await response.json();
      return result || [];
    } else {
      throw Error;
    }
  };

  useEffect(() => {
    const fetchExternalLocation = async (searchString) => {
      if (searchString.length > 0) {
        try {
          const externalLocation = await searchExternalLocation(searchString);
          setSearchLocations(externalLocation);
        } catch (e) {
          console.error(e);
          return e;
        }
      }
    };

    fetchExternalLocation(debouncedSearchString);
  }, [debouncedSearchString]);
  return <Input />;
}
