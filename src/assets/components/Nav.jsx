import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Nav() {
  let [isMenuOpen, setIsMenuOpen] = React.useState(false);
  let navigate = useNavigate();

  return (
    <Navbar isMenuOpen={isMenuOpen} className="bg-custom-gray">
      <NavbarContent>
        {localStorage.getItem('freshCartToken')
          ? <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
            onClick={() => { setIsMenuOpen(!isMenuOpen) }}
          /> : ''}
        <NavbarBrand>
          <Link className='text-2xl font-extrabold text-black cursor-pointer' to={'/'}>FreshCart</Link>
        </NavbarBrand>
      </NavbarContent>

      {localStorage.getItem('freshCartToken')
        ? (
          <>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                <NavLink to={'home'} className={'nav-link'}>Home</NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink to={'products'} className={'nav-link'}>Products</NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink to={'categories'} className={'nav-link'}>Categories</NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink to={'brands'} className={'nav-link'}>Brands</NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink to={'allorders'} className={'nav-link'}>Orders</NavLink>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem className="sm:flex hidden">
                <NavLink to={'/wishlist'} className={'nav-link'}><i className='fa-solid fa-heart text-lg'></i></NavLink>
              </NavbarItem>
              <NavbarItem className="sm:flex hidden">
                <NavLink to={'/cart'} className={'nav-link'}><i className='fa-solid fa-cart-shopping text-lg'></i></NavLink>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color="default" href="#" variant="flat" className="font-bold" onClick={() => { localStorage.clear('freshCartToken'); navigate('/login'); }}>
                  Sign Out
                </Button>
              </NavbarItem>
            </NavbarContent>
          </>
        ) : (
          <NavbarContent justify="end">
            <NavbarItem>
              <NavLink to={'/login'} className={'nav-link'}>
                Login
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink to={'/register'} className={'nav-link'}>
                Register
              </NavLink>
            </NavbarItem>
          </NavbarContent>
        )}



      {localStorage.getItem('freshCartToken')
        ? (
          <NavbarMenu isOpen={isMenuOpen} >
            <div className="flex gap-2 absolute right-[30px]">
            <NavbarMenuItem>
                <NavLink to={'/wishlist'} className={'nav-link'}><i className='fa-solid fa-heart text-lg' onClick={() => { setIsMenuOpen(false) }}></i></NavLink>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <NavLink to={'/cart'} className={'nav-link'}><i className='fa-solid fa-cart-shopping text-lg' onClick={() => { setIsMenuOpen(false) }}></i></NavLink>
              </NavbarMenuItem>
            </div>
            <NavbarMenuItem>
              <NavLink to={'home'} className={'nav-link'} onClick={() => { setIsMenuOpen(false) }}>Home</NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NavLink to={'products'} className={'nav-link'} onClick={() => { setIsMenuOpen(false) }}>Products</NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NavLink to={'categories'} className={'nav-link'} onClick={() => { setIsMenuOpen(false) }}>Categories</NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NavLink to={'brands'} className={'nav-link'} onClick={() => { setIsMenuOpen(false) }}>Brands</NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NavLink to={'allorders'} className={'nav-link'} onClick={() => { setIsMenuOpen(false) }}>Orders</NavLink>
            </NavbarMenuItem>
          </NavbarMenu>
        ) : ''}
    </Navbar>
  );
}
