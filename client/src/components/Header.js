import PageMenu from './PageMenu';

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <PageMenu />
        <a href="/" className="logo">
          Logo
        </a>
        <PageMenu />
      </div>
    </header>
  );
};

export default Header;
