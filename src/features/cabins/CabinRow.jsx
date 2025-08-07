import styled from "styled-components";
import helpers from '../../utils/helpers.js';
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import CreateCabinForm from "./CreateCabinForm.jsx";
import { useDeleteCabins } from "../../hooks/useDeleteCabin.js";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useDuplicateCabin from "../../hooks/useDuplicateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;



function CabinRow({ cabin }) {

  const { id: cabinID, name, maxCapacity, regularPrice, discount, image, } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabins(cabinID);
  const { duplicateCabin, isCreating } = useDuplicateCabin(cabinID);

  return (

    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{helpers.formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{helpers.formatCurrency(discount)}</Discount> : (<span>&mdash;</span>)}
      <div>
        <button onClick={() => duplicateCabin({ id: cabinID })} disabled={isCreating}><HiSquare2Stack /></button>
        <Modal>
          <Modal.Open opens='edit'>
            <button ><HiPencil /></button>
          </Modal.Open>
          <Modal.Window name='edit'>
            <CreateCabinForm cabinToedit={cabin} />
          </Modal.Window>



          <Modal.Open opens='delete'>
            <button ><HiTrash /></button>
          </Modal.Open>
          <Modal.Window name='delete'>
            <ConfirmDelete resourceName='Cabins'
              onConfirm={() => deleteCabin(cabinID)}
              disabled={isDeleting} />
          </Modal.Window>

        </Modal>

        <Menus.Menu>

        </Menus.Menu>
      </div>

    </Table.Row >


  )
}

CabinRow.propTypes = {
  cabin: PropTypes.object.isRequired,
};

export default CabinRow
