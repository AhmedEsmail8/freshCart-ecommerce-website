import React, { useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../lib/slices/themeSlice";
import { getCartProductsApi } from "../API/cart";
import { useQuery } from "@tanstack/react-query";
import { getWishlistProductsApi } from "../API/wishlist";


export default function Nav() {
  let [isMenuOpen, setIsMenuOpen] = React.useState(false);
  let {theme} = useSelector((data)=>data.theme)
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // let {data: cartData, isLoading: cartLoading, error: cartError, isError: cartIsError, refetch: cartRefetch} = useQuery({
  //   queryKey: ['getCartCount'],
  //   queryFn: getCartProductsApi,
  //   refetchInterval: 500
  // })

  // let { data: wishlistProducts, isLoading: wishlistProductsLoading, isError: wishlistProductsIsError, error: wishlistProductsError, refetch: wishlistProductsRefetch } = useQuery({
  //   queryKey: ['getWishlistProductsCount'],
  //   queryFn: getWishlistProductsApi,
  //   refetchInterval: 500
  // })
  
  

  function handleDarkChange(e) {
    e.preventDefault();
    let selectorTheme = e.target.checked ? 'dark' : 'light';
    
    if (selectorTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    dispatch(setTheme(selectorTheme));
    localStorage.setItem('freshCartTheme', selectorTheme);
  }
  

  return (
    <Navbar isMenuOpen={isMenuOpen} className="bg-custom-gray dark:bg-[#121212]">
      <NavbarContent>
        {localStorage.getItem('freshCartToken') ? (<NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
            onClick={() => { setIsMenuOpen(!isMenuOpen) }}
          />):''}
        
        <NavbarBrand>
          <Link className='text-2xl font-extrabold text-black dark:text-white cursor-pointer' to={'/'} >FreshCart</Link>
        </NavbarBrand>
      </NavbarContent>

      {localStorage.getItem('freshCartToken')
        ? (
          <>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                <NavLink to={'home'} className={'nav-link'} >Home</NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink to={'products'} className={'nav-link'} >Products</NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink to={'categories'} className={'nav-link'} >Categories</NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink to={'brands'} className={'nav-link'} >Brands</NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink to={'allorders'} className={'nav-link'} >Orders</NavLink>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem className="sm:flex hidden">
                <NavLink to={'/wishlist'} className={'nav-link relative'} >
                  <i className='fa-solid fa-heart text-lg'></i>
                  {/* <div className="w-[15px] h-[15px] p-3 rounded-full bg-black absolute top-[-10px] right-[-10px] text-white flex justify-center items-center">{wishlistProducts?.data?.count}</div> */}
                </NavLink>
              </NavbarItem>
              <NavbarItem className="sm:flex hidden">
                <NavLink to={'/cart'} className={'nav-link relative'} >
                <i className='fa-solid fa-cart-shopping text-lg'></i>
                {/* <div className="w-[15px] h-[15px] p-3 rounded-full bg-black absolute top-[-2px] right-[-8px] text-white flex justify-center items-center">{cartData?.data?.numOfCartItems}</div> */}
                </NavLink>
              </NavbarItem>
              <NavbarItem className="sm:flex hidden">
                <Button as={Link} color="default" href="#" variant="flat" className="font-bold dark:hover:text-gray-300" onClick={() => { localStorage.clear('freshCartToken'); navigate('/login'); window.scrollTo(0, 0)}}>
                  Sign Out
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Switch
                  size="md"
                  color="default"
                  startContent={<SunIcon />}
                  endContent={<MoonIcon />}
                  onChange={handleDarkChange}
                  isSelected={theme=='dark'}
                >
                </Switch>
              </NavbarItem>
            </NavbarContent>
          </>
        ) : (
          <NavbarContent justify="end">
            <NavbarItem className="sm:flex hidden">
              <NavLink to={'/login'} className={'nav-link'} >
                Login
              </NavLink>
            </NavbarItem>
            <NavbarItem className="sm:flex hidden">
              <NavLink to={'/register'} className={'nav-link'} >
                Register
              </NavLink>
            </NavbarItem>
            <NavbarItem>
                <Switch
                  size="md"
                  color="default"
                  startContent={<SunIcon />}
                  endContent={<MoonIcon />}
                  onChange={handleDarkChange}
                  isSelected={theme=='dark'}
                >
                </Switch>
              </NavbarItem>
          </NavbarContent>
        )}



      {localStorage.getItem('freshCartToken')
        ? (
          <NavbarMenu isOpen={isMenuOpen} className="w-full">
              
            <NavbarMenuItem className="w-fit mb-1">
              <NavLink to={'home'} className={'nav-link'} onClick={() => { setIsMenuOpen(false);  }}>
                <div className="flex items-center">
                  <i className="fa-solid fa-house text-sm"></i>
                  <p className="ml-2 text-base">Home</p>
                </div>
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem className="w-fit mb-1">
              <NavLink to={'products'} className={'nav-link'} onClick={() => { setIsMenuOpen(false);  }}>
                <div className="flex items-center">
                  <i className="fa-solid fa-t-shirt text-sm"></i>
                  <p className="ml-2 text-base">Products</p>
                </div>
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem className="w-fit mb-1">
              <NavLink to={'categories'} className={'nav-link'} onClick={() => { setIsMenuOpen(false);  }}>
                <div className="flex items-center">
                  <i className="fa-solid fa-layer-group text-sm"></i>
                  <p className="ml-2 text-base">Categories</p>
                </div>
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem className="w-fit mb-1">
              <NavLink to={'brands'} className={'nav-link'} onClick={() => { setIsMenuOpen(false);  }}>
                <div className="flex items-center">
                  <i className="fa-solid fa-tags text-sm"></i>
                  <p className="text-base ml-2">Brands</p>
                </div>
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem className="w-fit mb-1">
              <NavLink to={'allorders'} className={'nav-link'} onClick={() => { setIsMenuOpen(false);  }}>
                <div className="flex items-center">
                  <i className="fa-solid fa-list-check text-sm"></i>
                  <p className="text-base ml-2">Orders</p>
                </div>
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem className="w-fit mb-1">
                <NavLink to={'/wishlist'} className={'nav-link'} onClick={() => { setIsMenuOpen(false);  }}>
                  <div className="flex items-center">
                    <i className='fa-solid fa-heart text-sm'></i>
                    <p className="ml-2 text-base">Wish list</p>
                  </div>
                </NavLink>
              </NavbarMenuItem>
              <NavbarMenuItem className="w-fit mb-1">
                <NavLink to={'/cart'} className={'nav-link'} onClick={() => { setIsMenuOpen(false);  }}>
                  <div className="flex items-center">
                  <i className='fa-solid fa-cart-shopping text-sm'></i>
                  <p className="text-base ml-2">Cart</p>
                  </div>
                </NavLink>
              </NavbarMenuItem>
            <NavbarMenuItem className="w-fit mb-1" onClick={() => { localStorage.clear('freshCartToken'); navigate('/login'); }}>
              <div className="flex items-center nav-link cursor-pointer" >
                <i className="fa-solid fa-arrow-right-from-bracket text-sm"></i>
                <p className="ml-2 text-base">sign out</p>
              </div>
            </NavbarMenuItem>
          </NavbarMenu>
        ) : ''}
    </Navbar>
  );
}
