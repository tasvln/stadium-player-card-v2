import { styled } from "stitches.config";
import { Box } from "../common";
import Nav from "./Nav";

type LayoutProps = {
  header?: boolean;
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { header, children } = props;

  return (
    <Wrapper>
      {header && <Nav />}
      <Content>{children}</Content>
    </Wrapper>
  )
};

export default Layout;

const Wrapper = styled('div', {
  width: '100%',
  height: '100vh',
  minHeight: '-webkit-fill-available',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'auto',

  '@md': {
    background: '$white',
  },
})

const Content = styled('div', {
  width: '100%',
  height: '100%',
})