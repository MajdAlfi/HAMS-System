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
import { EditUserData } from "./Components/AdminView/EditUsers/EditUserData";
import { PrivateRoute } from "./Services/Others/privateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/signup" element={<SignupContainer />} />
        {/* <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/history" element={<HistoryHome />} /> */}

        <Route path="/bookapt" element={<BookAppointment />} />

        <Route
          path="/Home"
          element={
            <PrivateRoute accountTypeReq={"Patient"}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/dochome"
          element={
            <PrivateRoute accountTypeReq={"Doctor"}>
              <DoctorHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/adminhome"
          element={
            <PrivateRoute accountTypeReq={"Admin"}>
              <AdminHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/vieweditapt"
          element={
            <PrivateRoute accountTypeReq={"Patient"}>
              <ViewEditAppointment />
            </PrivateRoute>
          }
        />
        <Route
          path="/viewaptdoc"
          element={
            <PrivateRoute accountTypeReq={"Doctor"}>
              <AptViewDoc />
            </PrivateRoute>
          }
        />
        <Route
          path="/viewpatienthistory"
          element={
            <PrivateRoute accountTypeReq={"Doctor"}>
              <PatientHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/adminhome/manageuser"
          element={
            <PrivateRoute accountTypeReq={"Admin"}>
              <EditUserData />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
