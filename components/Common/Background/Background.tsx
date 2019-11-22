import { useRouter } from 'next/router'
import { css } from 'styled-components'
import { styled } from '../../../theme'
import animationChooser from '../../../utils/animationChooser'
import {
  SlideOutDown,
  SlideOutRight,
  SwipeOutDown,
  SwipeOutRight,
  ZoomOut,
} from '../../Animations'
import { BackgroundContext } from './Context'
import CookieConsent from 'react-cookie-consent'
import { initGA } from '../../../utils/analytics'

type StyledBackgroundProps = {
  currentPage: string
  route: string
}

type TransititonBackgroundProps = {
  route: string
}

type PageBackgroundProps = {
  currentPage: string
}

const closeAnimations = [
  SlideOutDown,
  SlideOutRight,
  SwipeOutDown,
  SwipeOutRight,
  ZoomOut,
]

const StyledBackground = styled.div<StyledBackgroundProps>`
  position: fixed;
  overflow-y: scroll;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: ${props => props.theme.sizes.dynamic[2]};
  height: ${props => props.theme.sizes.dynamic[2]};
  background: ${props => props.theme.pageColours[props.currentPage]};
  z-index: 2;

  .page-transition-exit-active & {
    ${props =>
      (props.route === '/' ||
        (props.currentPage !== '/' && props.route === '/films') ||
        (props.currentPage !== '/' && props.route === '/fotografie')) &&
      css`
        animation: ${animationChooser(closeAnimations)}
          ${props =>
            `${props.theme.animation.timing[1]} ${props.theme.animation.curve} ${props.theme.animation.timing[1]}`}
          forwards;
        transform-origin: center;
      `}
  }
`

const TransititonBackground = styled.div<TransititonBackgroundProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: ${props => props.theme.pageColours[props.route]};
`

export const Background: React.FunctionComponent<PageBackgroundProps> = props => {
  const router = useRouter()

  return (
    <BackgroundContext.Provider value={{ currentPage: props.currentPage }}>
      <StyledBackground {...props} route={router.route} />
      <TransititonBackground route={router.route} />
      <CookieConsent
        buttonText="Jazeker!"
        declineButtonText="Nee bedankt"
        enableDeclineButton
        declineButtonStyle={{
          background: '#b53333',
          fontFamily: '"Red Hat Display", sans-serif',
        }}
        buttonStyle={{
          color: '#fff',
          background: '#33b533',
          fontFamily: '"Red Hat Display", sans-serif',
          fontWeight: 'bold',
        }}
        style={{
          background: '#505050',
          fontFamily: '"Red Hat Display", sans-serif',
          fontWeight: 'bold',
        }}
        onAccept={() => initGA()}
      >
        Wij gebruiken cookies om deze website nog vetter te maken. Help je mee?
      </CookieConsent>
    </BackgroundContext.Provider>
  )
}
