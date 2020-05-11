import styled from 'styled-components'
import Header from '../../Header'

const Container = styled.div`
  flex: 1;
  background: ${props => props.theme.colours.tertiary};
  height: ${props => props.theme.heights[4]};
`

const FakeBody = styled.div`
  height: 100vh;
  max-width: 64rem;
  margin: auto;
  overflow-y: scroll;
  header {
    pointer-events: none;
  }
`

export const Sandbox = ({ children }) => (
  <Container>
    <FakeBody>
      <Header />
      {children}
    </FakeBody>
  </Container>
)
