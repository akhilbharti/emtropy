import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
  line-height: 1;
`;

const Subtitle = styled.h2`
  text-transform: uppercase;
  line-height: 1.5;
  color: inherit;
  font-size: 1.7;
  font-weight: 700;

  @media ${(props) => props.theme.mediaQueries.medium} {
    font-size: ${(props) => (props.size === "2" ? "1.3rem" : "1.1rem")};
  }
`;

function PublishDate({ number }){
  return (
    <Wrapper>
      <Subtitle>{number}</Subtitle>
    </Wrapper>
  );
};

export default React.memo(PublishDate);
