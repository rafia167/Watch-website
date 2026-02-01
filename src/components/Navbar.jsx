
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Clock, BaggageClaim, User } from "lucide-react";
import { navbarStyles } from "../assets/dummyStyles";
import { useCart } from "../CartContext.jsx";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Watches", href: "/watches" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const [active, setActive] = useState(location.pathname || "/");

  // ✅ correct login state
  const [loggedIn, setLoggedIn] = useState(() => {
    try {
      return localStorage.getItem("isLoggedIn") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    setActive(location.pathname || "/");
  }, [location]);

  const handleNavClick = (href) => {
    setActive(href);
    setOpen(false);
  };

  // ✅ correct logout
  const handleLogout = () => {
    try{
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLoggedIn");
    } catch(e){}
    setLoggedIn(false);
    setOpen(false)
    navigate("/");
  };

  // ✅ sync state if storage changes
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "isLoggedIn" || e.key === "authToken") {
        setLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <header className={navbarStyles.header}>
      <nav className={navbarStyles.nav} role="navigation">
        <div className={navbarStyles.container}>

          {/* LOGO */}
          <div className={navbarStyles.brandContainer}>
            <div className={navbarStyles.logoContainer}>
              <Clock className={navbarStyles.logoIcon} />
            </div>
            <Link
              to="/"
              onClick={() => handleNavClick("/")}
              className={navbarStyles.logoLink}
            >
              <span className={navbarStyles.logoText}>
                ChronoElite
              </span>
            </Link>
          </div>

          {/* NAV LINKS */}
          <div className={navbarStyles.desktopNav}>
            {navItems.map((item) => {
              const isActive = active === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`${navbarStyles.navItemBase} ${
                    isActive
                      ? navbarStyles.navItemActive
                      : navbarStyles.navItemInactive
                  }`}
                >
                  <span>{item.name}</span>
                  <span
                    className={`${navbarStyles.activeIndicator} ${
                      isActive
                        ? navbarStyles.activeIndicatorVisible
                        : navbarStyles.activeIndicatorHidden
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* RIGHT ACTIONS */}
          <div className={navbarStyles.rightActions}>
            <Link to="/cart" className={navbarStyles.cartLink}>
              <BaggageClaim className={navbarStyles.cartIcon} />
              {totalItems > 0 && (
                <span className={navbarStyles.cartBadge}>
                  {totalItems}
                </span>
              )}
            </Link>

            {/* ✅ ACCOUNT / LOGOUT */}
            {loggedIn ? (
              <button
                onClick={handleLogout}
                className={navbarStyles.accountLink}
              >
                <User className={navbarStyles.userIcon} />
                <span className={navbarStyles.accountText}>
                  Logout
                </span>
              </button>
            ) : (
              <Link
                to="/login"
                className={navbarStyles.accountLink}
              >
                <User className={navbarStyles.userIcon} />
                <span className={navbarStyles.accountText}>
                  Account
                </span>
              </Link>
            )}

            <div className={navbarStyles.mobileMenuButton}>
              <button
                onClick={() => setOpen(!open)}
                className={navbarStyles.menuButton}
              >
                {open ? (
                  <X className={navbarStyles.menuIcon} />
                ) : (
                  <Menu className={navbarStyles.menuIcon} />
                )}
              </button>
            </div>

          </div>

        </div>

        {open && (
          <div className={navbarStyles.mobileMenu}>
            <div className={navbarStyles.mobileMenuContainer}>
              {navItems.map((item) => {
                const isActive = active === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`${navbarStyles.mobileNavItemBase} ${
                      isActive
                        ? navbarStyles.mobileNavItemActive
                        : navbarStyles.mobileNavItemInactive
                    }`}
                  >
                    <span className={navbarStyles.mobileNavItemText}>
                      {item.name}
                    </span>
                  </Link>
                );
              })}

              <div className={navbarStyles.mobileAccountContainer} />
              {loggedIn ?(
                 <button onClick={handleLogout} className={navbarStyles.mobileAccountButton}>
                  <User  className={navbarStyles.mobileAccountIcon}/>
                  <span>Logout</span>
                </button>
              ) : (
               
                <Link to='/login' onClick={() =>{
                  setOpen(false);
                  handleNavClick('/login')
                }}  className={navbarStyles.mobileAccountLink}>
                  <User  className={navbarStyles.mobileAccountIcon}/>
                  <span>Account</span>
                </Link>
              )
              } 



             
            


              </div>
            </div>

         

        )}
      </nav>
    </header>
  );
};

export default Navbar;