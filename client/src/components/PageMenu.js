import MenuItems from './MenuItems';
import { pageItemsData } from './Pagedrop';

const PageMenu = () => {
  return (
    <nav className="desktop-nav">
      <ul className="menus">
        {pageItemsData.map((menu, index) => {
          return <MenuItems items={menu} key={index} />;
        })}
      </ul>
    </nav>
  );
};

export default PageMenu;