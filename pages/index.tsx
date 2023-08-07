import { Button } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { Image } from "antd";
import { useFetchWithCache } from "../hooks/useFetchWithCache";
import { client } from "../libs/apis";

const Home: NextPage = () => {
  const { data, loading, isFirstLoading } = useFetchWithCache(["abc"], () =>
    client.getTrendingGifs({})
  );

  console.log(data);

  if (loading || isFirstLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="w-screen">
      {(data?.data || []).map((d) => (
        <Image
          key={d.id}
          alt={d.title}
          src={d.images.original.url}
          className="object-cover"
        />
      ))}
    </div>
  );
};

export default Home;
