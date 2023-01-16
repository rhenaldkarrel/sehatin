import { Table, TableContainer, Tbody, Text, Thead } from "@chakra-ui/react";

import SidebarWithHeader from "components/Sidebar";
import Headers from "components/TableData/Headers";
import { useEffect, useState } from "react";
import Rows from "components/TableData/Rows";
import { QUEUE_TYPE_MEDICINE } from "./types/queue";

const QueueMedicine = () => {
  const [billingQueue, setBillingQueue] = useState([]);
  const [queueDone, setQueueDone] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/patients?status=Menunggu pembayaran", {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => setBillingQueue(data));

    fetch("http://localhost:3001/patients?status=Selesai", {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => setQueueDone(data));
  }, [])

  return (
    <>
      <SidebarWithHeader>
        <Text fontSize="xl" fontWeight="bold" mb="8px">
          Daftar Antrian Pembayaran Obat
        </Text>
        <TableContainer overflowX="auto" mb="2rem">
          <Table variant="simple">
            <Thead>
              <Headers headers={["No", "Nama", "Status", "Aksi"]} />
            </Thead>
            <Tbody>
              <Rows data={billingQueue} type={QUEUE_TYPE_MEDICINE} />
            </Tbody>
          </Table>
        </TableContainer>
        <Text fontSize="xl" fontWeight="bold" mb="8px">
          Daftar Antrian Pembayaran Obat yang Sudah Selesai
        </Text>
        <TableContainer overflowX="auto" mb="2rem">
          <Table variant="simple">
            <Thead>
              <Headers headers={["No", "Nama", "Status", "Aksi"]} />
            </Thead>
            <Tbody>
              <Rows data={queueDone} type={QUEUE_TYPE_MEDICINE} />
            </Tbody>
          </Table>
        </TableContainer>
      </SidebarWithHeader>
    </>
  );
};

export default QueueMedicine;
