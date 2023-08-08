import { Spin } from "antd";
import { useIntroContext } from "../../../context/intro";
import cx from "classnames";

export const Intro = () => {
  const { shouldEnd } = useIntroContext();
  return (
    <div
      className={cx(
        "z-100 top-0 left-0 fixed h-screen w-screen overflow-hidden flex justify-center items-center",
        {
          "delay-[2500ms] left-[100vw]": shouldEnd,
        }
      )}
    >
      <div
        className={cx(
          "absolute top-0 left-0 bg-gradient-to-r from-black via-black to-black h-screen w-[100vw]",
          {
            "transition-all duration-[2000ms] delay-[500ms] translate-x-[-220vw] md:translate-x-[-200vw]":
              shouldEnd,
          }
        )}
      />
      <div
        className={cx(
          "flex flex-col items-center justify-center min-h-[88px]",
          {
            "transition-all duration-[2000ms] delay-[500ms] translate-x-[-150vw] md:translate-x-[-110vw] opacity-0":
              shouldEnd,
          }
        )}
      >
        <span className="z-10 uppercase text-white text-4xl md:text-5xl font-extrabold bg-gradient-to-l from-indigo-500 to-rose-500 !bg-clip-text text-transparent">
          Giphy
        </span>
        <div
          style={{
            transition: "height 500ms, padding 500ms",
          }}
          className={cx(
            "duration-[1000ms] overflow-hidden min-w-[72px] p-4 pt-6 h-[72px] relative flex justify-center",
            {
              "!h-[0px] !p-0": shouldEnd,
            }
          )}
        >
          <Spin size="large" className="absolute bottom-2" />
        </div>
      </div>
    </div>
  );
};
