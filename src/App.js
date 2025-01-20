import { useEffect } from "react";
import reactDom from "react-dom/client";
import { dataStations } from "./config";
import {
  CustomNavBar,
  CustomHeader,
  CustomSkills,
  CustomAbout,
  CustomRef,
  CustomFoot,
  CustomEducation,
  CustomCareer,
  CustomPassions,
  CustomProjects,
  CustomExperience,
} from "./components/Panes";
import "./css/styles.css";

const root = reactDom.createRoot(document.querySelector("#root"));

const App = () => {
  useEffect(() => {
    console.log("fell");
  }, []);
  return (
    <React-StrictMode>
      <div className="container-md main-panel">
        <CustomNavBar />
        <CustomHeader />
        <CustomAbout />
        <CustomEducation />
        <CustomSkills />
        <CustomExperience />
        <CustomCareer />
        <CustomProjects />
        <CustomPassions />
        <CustomRef />
        <CustomFoot />
      </div>
    </React-StrictMode>
  );
};

root.render(<App />);
