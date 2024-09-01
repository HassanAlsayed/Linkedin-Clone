import { useContext } from "react";
import { AppContext } from "./AppProvider";
export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error('error in context');
    }
    return context;
};