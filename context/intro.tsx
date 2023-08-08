import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ContextValues {
  shouldEnd?: boolean;
  setShouldEnd?: Dispatch<SetStateAction<boolean>>;
}

export const IntroContext = createContext<ContextValues>({});

export const IntroContextProvider = ({ children }: any) => {
  const [shouldEnd, setShouldEnd] = useState(false);

  return (
    <IntroContext.Provider value={{ shouldEnd, setShouldEnd }}>
      {children}
    </IntroContext.Provider>
  );
};

export const useIntroContext = () => {
  return useContext(IntroContext);
};
