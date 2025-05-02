import { useState } from "react";
import { DashboardHome } from "./Dashboard/DashboardHome";
import { HistoryHome } from "./History/HistoryHome";
import { DoctorsHome } from "./Doctors/DoctorsHome";

export const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const btnNames = ["📈 Dashboard", "📜 History", "🩺 Doctors", "👩‍💼 Profile"];
  const pageList = [DashboardHome, HistoryHome, DoctorsHome];
  const PageComponent = pageList[currentPage];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ height: "100vh", width: "20vw" }}>
        <div style={{ height: "20vh" }}></div>
        {btnNames.map((e, index) => (
          <div
            key={index} // Always add a key when mapping in React
            style={{
              justifyContent: "left",
              marginTop: "5vh",
              marginLeft: "5%",
            }}
            onClick={() => setCurrentPage(index)}
          >
            <button
              style={{
                backgroundColor:
                  currentPage == index
                    ? "rgba(0, 164, 201, 0.62)"
                    : "rgba(233, 233, 233, 0.38)",
                borderRadius: "30px",
                width: "12vw",
                color:
                  currentPage == index ? "white" : "rgba(0, 164, 201, 0.62)",
                fontWeight: currentPage == index ? "bold" : "lighter",
                height: "5vh",
              }}
            >
              {e}
            </button>
          </div>
        ))}
      </div>

      <div>
        <PageComponent />
      </div>
    </div>
  );
};
