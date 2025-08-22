import { Box, Link, NavLink } from "@/components/common";
import { CardsIcon, PCardIcon, StadiumOut } from "@/components/icons";
import { links } from "@/utils/links";
import { useRouter } from "next/router";
import { styled } from "stitches.config";

const Nav = () => {
  const { pathname } = useRouter();

  return (
    <Header>
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '30px',
          height: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,

          '@md': {
            position: 'relative',
            flexDirection: 'row',
            padding: '24px',
            paddingBottom: '0',
          },
        }}
      >
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,

            '@md': {
              flexDirection: 'row',
            },
          }}
        >
          <NavLink
            href="/"
            variant={"nav"}
            css={{
              opacity: pathname === '/' ? 1 : 0.3,
            }}
          >
            <PCardIcon 
              width={50}
              height={50}
            />
          </NavLink>
          {/* <NavLink 
            href="/cards"
            variant={"nav"}
            css={{
              opacity: pathname === '/cards' ? 1 : 0.3,
            }}
          >
            <CardsIcon 
              width={50}
              height={50}
            />
          </NavLink> */}
        </Box>
        <Box>
          <Link 
            href={links.website}
            variant={"nav"}
            css={{
              marginBottom: 20,
            }}
          >
            <StadiumOut 
              width={50}
              height={50}
            />
          </Link>
        </Box>
      </Box>
    </Header>
  )
};

export default Nav;


const Header = styled('header', {
  background: 'transparent',
});