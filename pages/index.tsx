import Head from "next/head";
import { MainPageView } from "../components/pages/main/MainPageView";
import { IntroContextProvider } from "../context/intro";

const Home = () => {
  return (
    <>
      <Head>
        <title>Giphy</title>
      </Head>

      <IntroContextProvider>
        <MainPageView />
      </IntroContextProvider>
    </>
  );
};

export default Home;
