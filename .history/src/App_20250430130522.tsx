import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginContainer } from "./Components/Auth/LoginContainer";
import { SignupContainer } from "./Components/Auth/SignupContainer";
import { DashboardHome } from "./Components/patientView/Dashboard/DashboardHome";
import BookAppointment from "./Components/Appointment/BookAppointment";
import ViewEditAppointment from "./Components/Appointment/ViewEditAppointment";
import { HistoryHome } from "./Components/patientView/History/HistoryHome";
import { Home } from "./Components/patientView/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/signup" element={<SignupContainer />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/history" element={<HistoryHome />} />
        <Route path="/bookapt" element={<BookAppointment />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/vieweditapt" element={<ViewEditAppointment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
