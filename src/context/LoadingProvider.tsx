import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Loading from "../components/Loading";
import { setProgress } from "../components/utils/progress";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
  finishLoading: () => void;
}

const LoadingContext = createContext<LoadingType | null>(null);
export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);
  const progressInstance = useRef<any>(null);
  const isFinishedEarly = useRef(false);

  useEffect(() => {
    progressInstance.current = setProgress(setLoading);
    if (isFinishedEarly.current) {
      progressInstance.current.loaded();
    }
  }, []);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
    finishLoading: () => {
      if (progressInstance.current) {
        progressInstance.current.loaded();
      } else {
        isFinishedEarly.current = true;
      }
    }
  };

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
