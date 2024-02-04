import MenuItems from './MenuItems';
import { pageItemsData } from './Pagedrop';

const PageMenu = ({ rightAligned }) => {
  const dropdownClass = rightAligned ? 'desktop-nav dropdown right-aligned' : 'desktop-nav dropdown';
  const depthLevel = 0;
  return (
      <nav className={dropdownClass}>
      <ul className="menus">
        {pageItemsData.map((menu, index) => {
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
};

export default PageMenu;