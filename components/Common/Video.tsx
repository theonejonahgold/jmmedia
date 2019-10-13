import { MutableRefObject, ReactElement, useRef, useState } from 'react'
import { styled } from '../../theme'

type VideoContainerChildrenProps = {
  onCanPlay: () => void
  onLoadStart: () => void
  playing: boolean
  ref: MutableRefObject<HTMLVideoElement>
}

export type VideoContainerProps = {
  mayPlayVideo: boolean
  children: ({
    onCanPlay,
    onLoadStart,
    playing,
    ref,
  }: VideoContainerChildrenProps) => ReactElement<'video'>
}

export type VideoElementProps = {
  playing: boolean
  src: string
  onCanPlay: () => void
  onLoadStart: () => void
}

export const VideoElement = styled.video<VideoElementProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.theme.sizes.dynamic[2]};
  height: ${props => props.theme.sizes.dynamic[2]};
  object-fit: cover;

  @media speech {
    display: none;
  }
`

export const VideoContainer = (props: VideoContainerProps) => {
  const [canPlayVideo, setCanPlayVideo] = useState<boolean>(false)
  const videoRef: MutableRefObject<HTMLVideoElement> = useRef()
  const { mayPlayVideo, children } = props

  if (videoRef.current) {
    if (!mayPlayVideo || !canPlayVideo) {
      videoRef.current.pause()
    }
    if (mayPlayVideo && canPlayVideo) {
      videoRef.current.play()
    }
  }

  return children({
    playing: mayPlayVideo && canPlayVideo,
    onLoadStart: () => setCanPlayVideo(false),
    onCanPlay: () => setCanPlayVideo(true),
    ref: videoRef,
  })
}
