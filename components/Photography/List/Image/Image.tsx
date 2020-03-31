import { RefObject, useContext, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import styled, { css } from 'styled-components'
import { SwipeInRight } from '../../../Animations'
import { LoadingAnimator } from '../../../Common'
import { ListContext } from '../Context'
import { ImageContainer } from './Container'

export type ListImageCallbacks = {
  setRef: (ref: RefObject<any>) => void
  clickHandler: (ref: RefObject<any>, index: number) => void
}

type ListImageProps = {
  index: number
  photo: {
    src: string
    width: number
    height: number
    title: string
  }
  margin: string
  top: any
  left: any
  onClick: any
  loaded: boolean
} & ListImageCallbacks

type ImageProps = {
  loaded: boolean
  active: boolean
  width: number
  height: number
}

const Image = styled.img<ImageProps>`
  display: block;
  position: relative;
  z-index: 10;
  opacity: 0;
  max-width: 32rem;
  margin-bottom: 2.5rem;
  cursor: zoom-in;
  filter: brightness(1);
  transition: filter
    ${props =>
      `${props.theme.animation.timing[1]} ${props.theme.animation.curve}`};

  @media (pointer: fine) {
    &:not(:hover) {
      filter: brightness(0.75);
    }
  }

  ${props =>
    props.loaded &&
    css`
      opacity: ${props.active ? '0' : '1'};
      animation: ${SwipeInRight} ${props.theme.animation.timing[2]}
        ${props.theme.animation.curve} forwards;
    `};
`

export const ListImage: React.FunctionComponent<ListImageProps> = ({
  photo,
  index,
  setRef,
  clickHandler,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [inViewRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const imgRef = useRef<HTMLImageElement>()
  const { currentIndex, lightboxAnimating } = useContext(ListContext)

  return (
    <ImageContainer {...photo} ref={inViewRef}>
      {inView && (
        <>
          <Image
            {...photo}
            loaded={imageLoaded}
            ref={imgRef}
            onMouseOver={() => !lightboxAnimating && setRef(imgRef)}
            onClick={() => clickHandler(imgRef, index)}
            active={lightboxAnimating && currentIndex === index}
            onLoad={() => setImageLoaded(true)}
          />
          <LoadingAnimator loaded={imageLoaded} />
        </>
      )}
    </ImageContainer>
  )
}
