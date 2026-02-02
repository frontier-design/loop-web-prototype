import styled from 'styled-components'
import GlobalStyle from './styles.js'
import GridOverlay from './components/GridOverlay.jsx'
import { Grid, GridCell } from './grid/index.js'

const Section = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
`

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1rem, 5vw, 1.5rem);
  font-weight: 600;
  line-height: 1;
  margin-bottom: 1.5rem;
`

const Subtitle = styled.p`
  font-size: clamp(0.5rem, 2.5vw, 1rem);
  font-weight: 400;
  opacity: 0.85;
  margin-bottom: 0.5rem;
  line-height: 1.2;
`

const Highlight = styled.span`
  background-color: #ffccf1;
`

function App() {
  return (
    <>
      <GlobalStyle />
      <GridOverlay />
      <Section>
        <Grid as="div">
          <GridCell $start={4} $span={3} $spanMobile={4}>
            <Title> Main Project Template</Title>
            <Subtitle> This project template uses a <Highlight>12 column grid on desktop</Highlight> and a <Highlight>4 column grid on mobile.</Highlight> Press G to toggle the grid overlay.</Subtitle>

            <Subtitle> The tech stack includes <Highlight>React</Highlight>, <Highlight>Styled Components</Highlight>, and <Highlight>Vite</Highlight>.</Subtitle>
            <Subtitle> Remove the filler content and start building your own project.</Subtitle>
          </GridCell>
        </Grid>
      </Section>
    </>
  )
}

export default App
