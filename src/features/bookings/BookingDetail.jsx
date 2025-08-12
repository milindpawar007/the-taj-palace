import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare, HiArrowLeftOnRectangle, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Menus from "../../ui/Menus";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import useDeleteBooking from "./useDeleteBooking.js";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading, error } = useBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { checkOut, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  if (isLoading) return <Spinner />;
  if (error) return <Row><p>{String(error.message || error)}</p></Row>;
  if (!booking) return null;
  const { status, id: bookingId } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' &&
          < Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</ Button>}
        {status === 'unconfirmed' &&
          <Modal>
            <Modal.Open opens="delete-booking">
              <Button icon={<HiTrash />}>Delete booking</Button>
            </Modal.Open>

            <Modal.Window name="delete-booking">
              <ConfirmDelete
                resourceName="booking"
                onConfirm={() => deleteBooking(bookingId)} // <- use bookingId
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>}
        {status === 'checked-in' &&
          <Button icon={<HiArrowLeftOnRectangle />} onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>Check out</Button>}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>

    </>
  );
}

export default BookingDetail;
