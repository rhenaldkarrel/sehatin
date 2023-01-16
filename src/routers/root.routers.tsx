// Doctor
import EmrHistory from "pages/doctor/emrHistory";
import EmrDetail from "pages/doctor/emrDetail";
import CreateNewEmr from "pages/doctor/createNewEmr";
import PatientQueue from "pages/doctor/patientQueue";

// Receptionist
import QueueMedicine from "pages/receptionist/QueueMedicine";
import Incoming from "pages/receptionist/IncomingReservation";
import Antrian from "pages/receptionist/QueuePatient";

// Admin
import AdminHome from "pages/administration";
import Medicine from "components/molecules/AdminMedicineList";
import MedicineForm from "components/organisms/MedicineForm";
import Schedule from "components/molecules/ScheduleList";
import ScheduleForm from "components/organisms/ScheduleForm";
import User from "components/molecules/AdminUser";
import UserForm from "components/organisms/AdminUserForm";

// Patient
import ReservationForm from "pages/PatientPage/reservationForm"
import MySchedule from 'pages/PatientPage/schedule';
import MyEmr from 'pages/PatientPage/myEmr';
import MyEmrDetail from 'pages/PatientPage/myEmrDetail';
import MyReservationHistory from 'pages/PatientPage/reservationHistory';

export type RouterState = {
  path: string;
  element: JSX.Element;
};

export const PatientRoutes: RouterState[] = [
  {
    path: "/",
    element: <MySchedule />,
  },
  {
    path: "/my-emr",
    element: <MyEmr />,
  },
  {
    path: "/my-emr/:id",
    element: <MyEmrDetail />,
  },
  {
    path: "/form-reservasi",
    element: <ReservationForm />,
  },
  {
    path: "/reservation-history",
    element: <MyReservationHistory />
  }
]

export const DoctorRoutes: RouterState[] = [
  {
    path: "/",
    element: <PatientQueue />,
  },
  {
    path: "/emr-history",
    element: <EmrHistory />,
  },
  {
    path: "/emr-history/:id",
    element: <EmrDetail />,
  },
  {
    path: "/add-emr",
    element: <CreateNewEmr />,
  },
];

export const AdminRoutes: RouterState[] = [
  {
    path: "/",
    element: <AdminHome />,
  },
  {
    path: "/medicine",
    element: <Medicine />,
  },
  {
    path: "/medicine/form",
    element: <MedicineForm />,
  },
  {
    path: "/schedule",
    element: <Schedule />,
  },
  {
    path: "/schedule/:id",
    element: <ScheduleForm />,
  },
  {
    path: "/schedule/create",
    element: <ScheduleForm />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/user/create",
    element: <UserForm />,
  },
  {
    path: "/user/edit/:id",
    element: <UserForm />,
  },
];

export const ReceptionistRoutes: RouterState[] = [
  {
    path: "/",
    element: <Incoming />,
  },
  {
    path: "/queue-patient",
    element: <Antrian />,
  },
  {
    path: "/queue-medicine",
    element: <QueueMedicine />
  }
]
