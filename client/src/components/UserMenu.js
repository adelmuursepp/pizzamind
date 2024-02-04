import MenuItems from './MenuItems';
import { userDropData } from './Userdrop';

const PageMenu = ({ rightAligned }) => {
    const dropdownClass = rightAligned ? 'desktop-nav dropdown right-aligned' : 'desktop-nav dropdown';
    const depthLevel = 0;

    return (
        <nav className={dropdownClass}>
        <ul className="menus">
            {userDropData.map((menu, index) => {
            return <MenuItems items={menu} key={index} />;
            })}
        </ul>
        </nav>
    );
};

export default PageMenu;