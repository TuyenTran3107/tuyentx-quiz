import { NavLink, Outlet } from 'react-router-dom';
import "./LayoutDefault.scss";
import { getCookie } from '../../helpers/cookie';
import { useSelector } from 'react-redux';
function LayoutDefault() {
  const token = getCookie("token");
  useSelector(state => state.loginReducer);
  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          <div className="layout-default__logo">Quiz</div>
          <div className="menu">
            <ul>
              <li>
                <NavLink to="/">
                  Home
                </NavLink>
              </li>
              {token && (
                <>
                  <li>
                    <NavLink to="/topic">
                      Topic
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/answers">
                      Answers
                    </NavLink>
                  </li>
                </>
              )}

            </ul>
          </div>
          <div className="layout-default__account">
            {token ? (
              <>
                <NavLink to="/logout">Logout</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </div>

        </header>

        <main className="layout-default__main">
          <Outlet />
        </main>

        <footer className="layout-default__footer">
          Copyright @ 202x by NEYUT
        </footer>
      </div>
    </>
  )
}
export default LayoutDefault;