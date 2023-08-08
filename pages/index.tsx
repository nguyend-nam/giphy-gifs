import Head from "next/head";
import { MainPageView } from "../components/pages/main/MainPageView";

const Home = () => {
  return (
    <>
      <Head>
        <title>Giphy</title>
      </Head>
      <MainPageView />
    </>
  );
};

export default Home;
