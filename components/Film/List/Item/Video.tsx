import { styled } from '../../../../theme'
import { VideoContainer, VideoElement } from '../../../Common'
import { LinkWrapperContext } from '../../../Common/Link/Wrapper'

type ItemVideoProps = {
  video: string
  onLoad: any
}

const ItemVideoElement = styled(VideoElement)`
  opacity: ${props => (props.playing ? '1' : '0')};
  transition: opacity
    ${props =>
      `${props.theme.animation.timing[0]} ${props.theme.animation.curve}`};
`

export const ItemVideo: React.FunctionComponent<ItemVideoProps> = ({
  video,
  onLoad,
}) => (
  <LinkWrapperContext.Consumer>
    {({ isHovering }) => (
      <VideoContainer mayPlayVideo={isHovering}>
        {props => (
          <ItemVideoElement
            onLoadedData={onLoad}
            muted
            loop
            playsInline
            src={video}
            {...props}
          />
        )}
      </VideoContainer>
    )}
  </LinkWrapperContext.Consumer>
)
