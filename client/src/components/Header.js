import UserMenu from './UserMenu';
import PageMenu from './PageMenu';

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <UserMenu rightAligned={false}/>
        <a href="/" className="logo">
          <h1>🍕</h1>
        </a>
        <PageMenu rightAligned={false}/>
      </div>
    </header>
  );
};

export default Header;
