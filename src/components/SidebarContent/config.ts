import {
  FiHome,
  FiBook,
  FiFilePlus,
  FiCalendar,
  FiUsers,
  FiList,
  FiClock,
  FiDroplet,
} from "react-icons/fi";
import {
  GrHistory
} from "react-icons/gr";

export const DoctorLinks = [
  { name: "Beranda", icon: FiHome, href: "/" },
  { name: "Daftar EMR", icon: FiBook, href: "/emr-history" },
  { name: "Tambah EMR", icon: FiFilePlus, href: "/add-emr" },
];

export const PatientLinks = [
  { name: "Beranda", icon: FiHome, href: "/" },
  { name: "Form Reservasi", icon: FiCalendar, href: "/form-reservasi" },
  { name: "Riwayat EMR", icon: FiBook, href: "/my-emr" },
  { name: 'Riwayat Reservasi', icon: GrHistory, href: '/reservation-history' },
];

export const AdminLinks = [
  { name: "Beranda", icon: FiHome, href: "/" },
  { name: "Obat", icon: FiList, href: "/medicine" },
  { name: "Jadwal", icon: FiClock, href: "/schedule" },
  { name: "Pengguna Aplikasi", icon: FiUsers, href: "/user" },
];

export const ReceptionistLinks = [
  { name: "Beranda", icon: FiHome, href: "/" },
  { name: "Antrian Pasien", icon: FiUsers, href: "/queue-patient" },
  { name: "Antrian Obat", icon: FiDroplet, href: "/queue-medicine" },
];
