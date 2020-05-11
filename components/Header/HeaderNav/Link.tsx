import styled from 'styled-components'
import { BaseHeading } from '../../Text/Headings/BaseHeading'
import Link from 'next/link'

type NavLinkProps = {
  href: string
  outbound?: boolean
}

const StyledAnchor = styled.a`
  ${BaseHeading};
  margin-left: ${props => props.theme.spacing[1]};
  font-size: ${props => props.theme.fontSizes[2]};
  color: ${props => props.theme.colours.secondary};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights[2]};
  cursor: pointer;
`

export const HeaderNavLink: React.FunctionComponent<NavLinkProps> = ({
  href,
  outbound,
  children,
}) => (
  <li>
    {outbound ? (
      <StyledAnchor href={href}>{children}</StyledAnchor>
    ) : (
      <Link href={href}>
        <StyledAnchor>{children}</StyledAnchor>
      </Link>
    )}
  </li>
)
