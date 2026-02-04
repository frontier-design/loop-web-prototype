import styled from 'styled-components'
import { Grid, GridCell } from '../../../grid/index.js'

const IntroSection = styled.section`
  background: var(--color-lime, #E7F5A6);
  min-height: 100vh;
  display: flex;
  align-items: flex-end;
  padding: clamp(4rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem) 0;
`

const IntroText = styled.p`
  font-family: 'ABCDiatype', system-ui, -apple-system, sans-serif;
  font-weight: 700;
  font-size: clamp(5rem, 4vw, 10rem);
  line-height: 1.1;
  color: var(--color-forest, #154C2C);
  max-width: 20em;
  margin: 0;
`

function Intro() {
  return (
    <IntroSection>
      <Grid as="div">
        <GridCell $start={1} $span={12} $startMobile={1} $spanMobile={4}>
          <IntroText>
            The Loop is a new 80km circular trail that will connect the Don and Humber valleys, the Finch Hydro Corridor and the Lake Ontario waterfront.
          </IntroText>
        </GridCell>
      </Grid>
    </IntroSection>
  )
}

export default Intro
