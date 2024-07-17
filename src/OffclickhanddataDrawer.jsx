import { useState } from "react";

const useCustomHook = () => {
  const [data, setData] = useState(true);

  return { data, setData };
};

export default useCustomHook;
