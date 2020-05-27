import Image from 'components/Image'
import Link from 'next/link'
import styled from 'styled-components'

type ListItemProps = {
  href: string
  src: string
  document: string
  children: string
}

const StyledLI = styled.li`
  display: block;
  grid-column: span 1;
  grid-row: span 1;
  width: 100%;
  height: 100%;
  a:hover q {
    text-decoration: underline;
  }
`

export const ListItem: React.FunctionComponent<ListItemProps> = ({
  href,
  document,
  src,
  children,
}) => (
  <StyledLI>
    <Link href={document} as={href}>
      <a>
        <Image src={src} alt={children} />
      </a>
    </Link>
  </StyledLI>
)
