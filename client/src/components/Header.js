import UserMenu from './UserMenu';
import PageMenu from './PageMenu';

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <PageMenu rightAligned={false}/>
          <h2 className="h2-title">PizzaMind</h2>
        <UserMenu rightAligned={false}/>
      </div>
    </header>
  );
};

export default Header;
