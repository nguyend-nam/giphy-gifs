import { AutoComplete, Button, Form, Spin } from "antd";
import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  createRef,
} from "react";
import useDebounce from "../../../hooks/useDebounce";
import { client } from "../../../libs/apis";
import { GetSearchSuggestionItem } from "../../../types";
import cx from "classnames";
import { SearchOutlined } from "@ant-design/icons";

interface Props {
  className?: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export const GifSearch = ({ className, onChange }: Props) => {
  const [options, setOptions] = useState<GetSearchSuggestionItem[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const ref = createRef<any>();

  useEffect(() => {
    if (!search) {
      onChange(search);
    }
  }, [onChange, search]);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    searchUsers(debouncedSearch, setLoading, setOptions).catch(console.error);
  }, [debouncedSearch]);

  return (
    <Form
      className={cx("flex justify-center py-4 gap-4", className)}
      noValidate
      onFinish={() => {
        onChange(search);
        ref?.current?.blur();
      }}
    >
      <AutoComplete
        ref={ref}
        className="flex-1 h-14"
        options={options.map((o) => ({ label: o.name, value: o.name }))}
        onSearch={setSearch}
        onSelect={setSearch}
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
      <Button
        htmlType="submit"
        type="primary"
        className="h-14 w-14 bg-gradient-to-tr from-indigo-500 to-rose-500 !border-none !shrink-0"
      >
        <div className="flex justify-center items-center">
          <SearchOutlined className="text-3xl h-[30px] flex" />
        </div>
      </Button>
    </Form>
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
