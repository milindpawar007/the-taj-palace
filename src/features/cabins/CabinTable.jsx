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
import Empty from "../../ui/Empty.jsx";

function CabinTable() {

  // const { isLoading, data: cabins, error } = useQuery({
  //   queryKey: ['cabins'],
  //   queryFn: getCabins
  // });
  const { isLoading, cabins, error } = useCabins();
  const [searchParamas] = useSearchParams();
  const filterValue = searchParamas.get("discount") || "all"


  if (isLoading) return <Spinner />
  if (!cabins.length) return <Empty resourceName={"bookings"}></Empty>
  // 1) filter
  const filteredCabins =
    filterValue === "no-discount"
      ? cabins.filter(c => c.discount === 0)
      : filterValue === "with-discount"
        ? cabins.filter(c => c.discount > 0)
        : cabins;

  // 2)sorting
  console.log(cabins)
  const sortByValue = searchParamas.get("sortBy") || "name-asc";
  const [field, direction] = sortByValue.split("-");
  const modifier = direction === 'asc' ? 1 : -1
  const sortedCabins = [...filteredCabins].sort((a, b) => {
    if (field === "name") {
      return a.name.localeCompare(b.name) * modifier;
    }
    // numeric fields
    return ((a[field] ?? 0) - (b[field] ?? 0)) * modifier;
  });


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
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />



      </Table>
    </Menus>
  )
}

export default CabinTable
