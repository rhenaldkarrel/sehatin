import {
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
} from "@chakra-ui/react";

import SidebarWithHeader from "components/Sidebar";
import Headers from "components/TableData/Headers";
import { useEffect, useState } from "react";
import Rows from "components/TableData/Rows";
import PatientScheduleData from "types/PatientScheduleData";

export default function Schedule() {
  const [data, setData] = useState([]);

  useEffect(()=> {
    fetch(`http://localhost:3001/patients`)
      .then(res => res.json())
      .then(data => {
        data
          .sort((a: PatientScheduleData, b: PatientScheduleData) => a.jam.localeCompare(b.jam))
          .sort((a: PatientScheduleData, b: PatientScheduleData) => a.tanggal.localeCompare(b.tanggal));
        setData(data)
      })
  }, [])

  return (
    <>
      <SidebarWithHeader>
        <Text fontSize="xl" fontWeight="bold" mb="8px">
          Jadwal Antrean Berobat
        </Text>
        <TableContainer overflowX="auto" mb="2rem">
          <Table variant="simple">
            <Thead>
              <Headers headers={["No", "Nama", "Tanggal", "Jam", "Dokter"]} />
            </Thead>
            <Tbody>
              <Rows data={data} type='schedule' />
            </Tbody>
          </Table>
        </TableContainer>
      </SidebarWithHeader>
    </>
  );
}
