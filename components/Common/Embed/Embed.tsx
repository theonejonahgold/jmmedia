import { styled } from '../../../theme'
import { FadeIn, RotateInDown, FadeOut } from '../../Animations'
import { EmbedContext } from './Context'
import { HTMLAttributes } from 'react'
import { css } from 'styled-components'

type StyledIframeProps = {
  embedState: 'unopened' | 'open' | 'closed'
}

const StyledIframe = styled.iframe<StyledIframeProps>`
  display: block;
  margin: auto;
  width: ${props => props.theme.sizes.dynamic[2]};
  height: ${props => props.theme.sizes.height[2]};
  opacity: 0;

  ${props =>
    props.embedState === 'open'
      ? css`
          animation: ${FadeIn} ${props.theme.animation.timing[1]}
            ${props.theme.animation.curve} ${props.theme.animation.timing[1]}
            forwards;
        `
      : props.embedState === 'closed' &&
        css`
          opacity: 1;
          animation: ${FadeOut} ${props.theme.animation.timing[1]}
            ${props.theme.animation.curve} forwards;
        `}
`

export const Embed: React.FunctionComponent<any> = props => (
  <EmbedContext.Consumer>
    {({ embedState }) => <StyledIframe {...props} embedState={embedState} />}
  </EmbedContext.Consumer>
)