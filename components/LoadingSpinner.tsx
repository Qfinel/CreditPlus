import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

// Styled spinner component
const Spinner = styled.div`
  width: 35px;
  height: 35px;
  border: 4px solid transparent;
  border-top: 4px solid ${props => props.theme.colors.primary_base};
  border-radius: 50%;
  animation: ${rotateAnimation} 1s linear infinite;
`;

// Component that displays the loading spinner
const LoadingSpinner = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;