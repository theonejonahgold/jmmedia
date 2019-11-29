import { rgba } from 'polished'
import { useState } from 'react'
import { filmState } from '../../../interfaces/filmState'
import { styled } from '../../../theme'
import { FadeIn, FadeOut } from '../../Animations'
import Header from '../../Common/Header'
import { FilmCloseButton } from './CloseButton'
import { FilmContext } from './Context'
import { FilmPlayButton } from './PlayButton'
import { NavButton } from '../../Common'
import Link from 'next/link'

type StyledHeaderProps = {
  background: string
  state: filmState
}

type FilmHeroProps = {
  background: string
}

const StyledHeader = styled(Header)<StyledHeaderProps>`
  background: linear-gradient(${rgba('black', 0.75)}, ${rgba('black', 0.75)}),
    url(${props => props.background}) no-repeat center/cover;
  height: ${props => props.theme.sizes.height[3]};
  width: ${props => props.theme.sizes.dynamic[2]};
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-content: initial;
  align-items: initial;

  &:not(:only-child) {
    transition: height
      ${props =>
        `${props.theme.animation.timing[1]} ${props.theme.animation.curve}`};
    height: ${props =>
      props.state === 'open'
        ? props.theme.sizes.height[3]
        : props.theme.sizes.height[2]};
  }

  .page-transition-enter & {
    opacity: 0;
  }

  .page-transition-enter-active & {
    animation: ${FadeIn}
      ${props =>
        `${props.theme.animation.timing[1]} ${props.theme.animation.curve}`}
      forwards;
  }

  .page-transition-exit-active & {
    animation: ${FadeOut}
      ${props =>
        `${props.theme.animation.timing[1]} ${props.theme.animation.curve}`}
      forwards;
  }
`

export const FilmHero: React.FunctionComponent<FilmHeroProps> = ({
  children,
  ...props
}) => {
  const [filmState, setFilmState] = useState<filmState>('unopened')

  return (
    <FilmContext.Provider value={{ state: filmState, setState: setFilmState }}>
      <StyledHeader state={filmState} {...props}>
        {children}
        <Link href="/films">
          <NavButton hide={filmState === 'open'} icon="arrow-left" />
        </Link>
        <FilmCloseButton />
        <FilmPlayButton />
      </StyledHeader>
    </FilmContext.Provider>
  )
}
