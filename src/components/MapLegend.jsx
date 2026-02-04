import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 10;
  background: #fff;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'ABCDiatype', system-ui, sans-serif;
  font-weight: 700;
  font-size: 0.8125rem;
  color: #1a1a1a;
`;

const LineSample = styled.span`
  display: block;
  width: 32px;
  min-height: 4px;
  flex-shrink: 0;
  border-top: 4px ${(p) => (p.$dashed ? 'dashed' : 'solid')} ${(p) => (p.$dashed ? '#1a1a1a' : p.$color)};
  border-radius: 0px;
  box-sizing: border-box;
`;

function MapLegend() {
  return (
    <Wrapper>
      <Row>
        <LineSample $color="#00A86B" />
        The Loop Trail
      </Row>
      <Row>
        <LineSample $dashed />
        TTC Lines
      </Row>
    </Wrapper>
  );
}

export default MapLegend;
