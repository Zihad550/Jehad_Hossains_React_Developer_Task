import React from 'react';
import { Link } from 'react-router-dom';
import cart from '../../assets/icons/cart.svg';
import logo from '../../assets/logo/logo.svg';
import Anchor from '../../Components/Anchor';
import HeaderContainer from '../../Components/HeaderContainer';

function Header({ handleCategory }) {
  const navs = [
    { id: 1, name: 'all', link: '/' },
    { id: 2, name: 'clothes', link: '/' },
    { id: 3, name: 'tech', link: '/' }
  ];
  return (
    <HeaderContainer>
      {/* navs */}
      <nav>
        {
            navs.map((nav) => (
              <Anchor onClick={() => handleCategory(nav.name)} as={Link} key={nav.id} to={nav.link}>
                {nav.name}
              </Anchor>
            ))
        }
      </nav>
      {/* logo */}
      <div>
        <img src={logo} alt="" />
      </div>

      {/* features */}
      <div>
        {/* currency */}
        <p>
          &#x24;
        </p>
        {/* shopping cart */}
        <img src={cart} alt="" />
      </div>

    </HeaderContainer>
  );
}

export default Header;
