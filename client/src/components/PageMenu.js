import MenuItems from './MenuItems';
import { pageItemsData } from './Pagedrop';

const PageMenu = ({ rightAligned }) => {
  const dropdownClass = rightAligned ? 'desktop-nav dropdown right-aligned' : 'desktop-nav dropdown';
  return (
      <nav className={dropdownClass}>
      <ul className="menus">
        {pageItemsData.map((menu, index) => {
          return <MenuItems items={menu} key={index} />;
        })}
      </ul>
    </nav>
  );
};

export default PageMenu;