import { AutoComplete, Spin } from "antd";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { client } from "../../../libs/apis";
import { GetSearchSuggestionItem } from "../../../types";

export const GifSearch = () => {
  const [options, setOptions] = useState<GetSearchSuggestionItem[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    searchUsers(debouncedSearch, setLoading, setOptions).catch(console.error);
  }, [debouncedSearch]);

  return (
    <div className="w-screen flex justify-center p-4">
      <AutoComplete
        className="w-[200px]"
        options={options.map((o) => ({ label: o.name, value: o.name }))}
        onSearch={setSearch}
        placeholder="Search all the GIFs"
        dropdownRender={(menu) =>
          loading ? (
            <div className=" min-h-[100px] flex justify-center items-center">
              <Spin />
            </div>
          ) : (
            menu
          )
        }
      />
    </div>
  );
};

const searchUsers = async (
  searchText: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setOptions: Dispatch<SetStateAction<GetSearchSuggestionItem[] | []>>
) => {
  if (searchText.length === 0) {
    setOptions([]);
  } else {
    try {
      setLoading(true);
      const res = await client.getSearchSuggestions({
        term: searchText,
      });

      setOptions(res?.data || []);
    } catch (error) {
      console.log(error);

      setOptions([]);
    } finally {
      setLoading(false);
    }
  }
};
