import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { GRID } from '../grid/config.js'

const NAV_LINKS = [
  { label: 'Hubs', href: '#hubs' },
  { label: 'Indigenous Stewardship', href: '#indigenous-stewardship' },
  { label: 'Maps', href: '#maps' },
  { label: 'FAQ', href: '#faq' }
]

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: min(${GRID.MAX_WIDTH}px, 100%);
  margin: 0 auto;
  padding: 1.25rem ${GRID.PADDING}px;
  background: ${props => props.$onLanding ? 'transparent' : '#fff'};
  box-sizing: border-box;
  transform: translateY(${props => props.$hidden ? '-100%' : '0'});
  transition: transform 0.3s ease, background 0.2s ease;

  @media (max-width: ${GRID.BREAKPOINT}) {
    padding: 1.25rem ${GRID.PADDING_MOBILE}px;
    background: ${props => props.$menuOpen || !props.$onLanding ? '#fff' : 'transparent'};
  }
`

const NavLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 0;
`

const Logo = styled.a`
  font-family: 'ABCDiatype', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.25rem, 1.5vw, 1.5rem);
  color: ${props => props.$dark ? '#fff' : '#1a1a1a'};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.$dark ? '#fff' : '#1a1a1a'};
  }

  @media (max-width: ${GRID.BREAKPOINT}) {
    color: ${props => props.$menuOpen ? '#1a1a1a' : (props.$dark ? '#fff' : '#1a1a1a')};
  }
`

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1.25rem, 2.5vw, 2.5rem);
`

const NavRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: clamp(1.25rem, 2.5vw, 2.5rem);
  min-width: 0;

  @media (max-width: ${GRID.BREAKPOINT}) {
    display: none;
  }
`

const MenuToggle = styled.button`
  display: none;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: ${props => props.$dark ? '#fff' : '#1a1a1a'};
  transition: color 0.2s ease, transform 0.2s ease;

  @media (max-width: ${GRID.BREAKPOINT}) {
    display: flex;
    color: ${props => props.$menuOpen ? '#1a1a1a' : (props.$dark ? '#fff' : '#1a1a1a')};
  }

  &:hover {
    transform: scale(1.05);
  }
`

const MenuToggleIcon = styled.span`
  position: relative;
  width: 1.25rem;
  height: 1.25rem;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    background: currentColor;
    transition: transform 0.25s ease;
  }

  &::before {
    width: 100%;
    height: 2px;
    transform: translate(-50%, -50%) ${props => props.$open ? 'rotate(45deg)' : 'rotate(0)'};
  }

  &::after {
    width: 2px;
    height: 100%;
    transform: translate(-50%, -50%) ${props => props.$open ? 'rotate(45deg)' : 'rotate(0)'};
  }
`

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: #fff;
  padding: 5rem ${GRID.PADDING_MOBILE}px 2rem;
  flex-direction: column;
  gap: 1.5rem;
  opacity: ${props => props.$open ? 1 : 0};
  visibility: ${props => props.$open ? 'visible' : 'hidden'};
  transition: opacity 0.25s ease, visibility 0.25s ease;

  @media (max-width: ${GRID.BREAKPOINT}) {
    display: flex;
    padding-top: calc(4rem + env(safe-area-inset-top));
  }
`

const MobileNavLink = styled.a`
  font-family: 'ABCDiatype', system-ui, sans-serif;
  font-weight: 300;
  font-size: 1.5rem;
  color: #1a1a1a;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
`

const MobileCtaButton = styled.a`
  font-family: 'ABCDiatype', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  background: #1a1a1a;
  color: #fff;
  text-decoration: none;
  margin-top: 0.5rem;
  align-self: flex-start;
  transition: background 0.2s ease;

  &:hover {
    background: #333;
  }
`

const NavLink = styled.a`
  font-family: 'ABCDiatype', system-ui, sans-serif;
  font-weight: 300;
  font-size: clamp(0.875rem, 1vw, 1rem);
  color: ${props => props.$dark ? '#fff' : '#1a1a1a'};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
`

const CtaButton = styled.a`
  font-family: 'ABCDiatype', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(0.875rem, 1vw, 1rem);
  padding: 0.6rem 1.25rem;
  background: ${props => props.$dark ? '#fff' : '#1a1a1a'};
  color: ${props => props.$dark ? '#1a1a1a' : '#fff'};
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${props => props.$dark ? '#e5e5e5' : '#333'};
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`

function Nav() {
  const [isDarkBackground, setIsDarkBackground] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const programmaticScrollRef = useRef(false)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const landing = document.getElementById('landing')
    if (!landing) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDarkBackground(entry.isIntersecting)
      },
      { threshold: 0.5, rootMargin: '-10% 0px 0px 0px' }
    )
    observer.observe(landing)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onHubScrollStart = () => {
      programmaticScrollRef.current = true
    }
    const onHubScrollEnd = () => {
      programmaticScrollRef.current = false
    }
    window.addEventListener('hub-scroll-start', onHubScrollStart)
    window.addEventListener('hub-scroll-end', onHubScrollEnd)
    return () => {
      window.removeEventListener('hub-scroll-start', onHubScrollStart)
      window.removeEventListener('hub-scroll-end', onHubScrollEnd)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        if (programmaticScrollRef.current) {
          lastScrollY.current = y
          ticking.current = false
          return
        }
        if (y > lastScrollY.current && y > 80) {
          setIsHidden(true)
        } else {
          setIsHidden(false)
        }
        lastScrollY.current = y
        ticking.current = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <NavBar $hidden={isHidden} $onLanding={isDarkBackground} $menuOpen={menuOpen}>
        <NavLeft>
          <Logo href="#" $dark={isDarkBackground} $menuOpen={menuOpen}>The Loop Trail</Logo>
        </NavLeft>
        <NavRight>
          <Links>
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink key={href} href={href} $dark={isDarkBackground}>
                {label}
              </NavLink>
            ))}
          </Links>
          <CtaButton href="#get-involved" $dark={isDarkBackground}>Get Involved</CtaButton>
        </NavRight>
        <MenuToggle
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          $dark={isDarkBackground}
          $menuOpen={menuOpen}
        >
          <MenuToggleIcon $open={menuOpen} />
        </MenuToggle>
      </NavBar>
      <MobileMenu $open={menuOpen}>
        {NAV_LINKS.map(({ label, href }) => (
          <MobileNavLink key={href} href={href} onClick={closeMenu}>
            {label}
          </MobileNavLink>
        ))}
        <MobileCtaButton href="#get-involved" onClick={closeMenu}>Get Involved</MobileCtaButton>
      </MobileMenu>
    </>
  )
}

export default Nav
