import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginContainer } from "./Components/PatientView/Auth/LoginContainer";
import { SignupContainer } from "./Components/PatientView/Auth/SignupContainer";
import BookAppointment from "./Components/PatientView/Appointment/BookAppointment";
import ViewEditAppointment from "./Components/PatientView/Appointment/ViewEditAppointment";
import { Home } from "./Components/PatientView/Home";
import { DoctorHome } from "./Components/DoctorView/DocHome";
import { AptViewDoc } from "./Components/DoctorView/Appointments/AptViewDoc";
import { PatientHistory } from "./Components/DoctorView/Appointments/PatientHistory";
import { AdminHome } from "./Components/AdminView/AdminHome";

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
        <Route path="/dochome" element={<DoctorHome />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/vieweditapt" element={<ViewEditAppointment />} />
        <Route path="/viewaptdoc" element={<AptViewDoc />} />
        <Route path="/viewpatienthistory" element={<PatientHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
