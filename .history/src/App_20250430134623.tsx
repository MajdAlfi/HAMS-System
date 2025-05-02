import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginContainer } from "./Components/PatientView/Auth/LoginContainer";
import { SignupContainer } from "./Components/PatientView/Auth/SignupContainer";
import BookAppointment from "./Components/PatientView/Appointment/BookAppointment";
import ViewEditAppointment from "./Components/PatientView/Appointment/ViewEditAppointment";
import { Home } from "./Components/PatientView/Home";
import { DoctorHome } from "./Components/DoctorView/DocHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/signup" element={<SignupContainer />} />
        {/* <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/history" element={<HistoryHome />} /> */}
        <Route path="/bookapt" element={<BookAppointment />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/DocHome" element={<DoctorHome />} />
        <Route path="/vieweditapt" element={<ViewEditAppointment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
