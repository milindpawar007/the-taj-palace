import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { set } from "date-fns";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false)
  useEffect(() => { getCabins().then((data) => console.log(data)) }, [])

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Fliter / Sort</p>

      </Row>
      <Row type="vertical" >

        <CabinTable />

        <Button variation="primary" onClick={() => { setShowForm(show => !show) }}> add new Cabin</Button>

        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
