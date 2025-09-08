import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {

  const [confirmPaid, SetconfirmPaid] = useState(false);
  const [addBreakfast, SetAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { isLoading: isSettingsLoading, settings } = useSetting();

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => { SetconfirmPaid(booking?.isPaid ?? false) }, [booking])




  if (isLoading || isSettingsLoading) <Spinner />
  if (!booking) return null;

  const { breakfastPrice } = settings;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    const breakfast = addBreakfast
      ? {
        hasBreakfast: true,
        extrasPrice: optionalBreakfastPrice,
        totalPrice: totalPrice + optionalBreakfastPrice,
      }
      : {};
    checkin({ bookingId, breakfast });

  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && <Box>
        <Checkbox id="breakfast" checked={addBreakfast} onChange={
          () => {
            SetAddBreakfast((p) => !p)
            SetconfirmPaid(false)
          }}>
          Want to  Add Break Fast for {formatCurrency(optionalBreakfastPrice)}
        </Checkbox>
      </Box>}
      <Box>
        <Checkbox checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => { SetconfirmPaid(confirm => !confirm) }}>
          I confirm that {guests.fullName} has paid the full amount of  {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)} )`}</Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
