import styled from "styled-components";
import Spinner from '../../ui/Spinner'
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import useCabins from "../../hooks/useCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import { useSearchParams } from "react-router-dom";

function CabinTable() {

  // const { isLoading, data: cabins, error } = useQuery({
  //   queryKey: ['cabins'],
  //   queryFn: getCabins
  // });
  const { isLoading, cabins, error } = useCabins();
  const [searchParamas] = useSearchParams();
  const filterValue = searchParamas.get("discount") || "all"


  if (isLoading) return <Spinner />

  let filtercabins;
  if (filterValue === "all") {
    console.log(cabins)
    filtercabins = cabins
  }
  else if (filterValue === "no-discount") {
    filtercabins = cabins.filter((cabin) => cabin.discount === 0)
  }
  else if (filterValue === "with-discount") {
    filtercabins = cabins.filter((cabin) => cabin.discount > 0)
  }

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filtercabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />



      </Table>
    </Menus>
  )
}

export default CabinTable
