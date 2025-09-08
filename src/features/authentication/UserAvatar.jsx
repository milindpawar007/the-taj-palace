import styled from "styled-components";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

import React from 'react'
import { useGetAuthUser } from "./useGetAuthUser";

function UserAvatar() {
  const { user } = useGetAuthUser();
  const { full_name, avatar } = user.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar src={avatar || 'default-user.jpg'} alt={`Avatart of ${full_name}`} />
      <span>{full_name ? full_name : "Test Data"}</span>
    </StyledUserAvatar>
  )
}

export default UserAvatar
