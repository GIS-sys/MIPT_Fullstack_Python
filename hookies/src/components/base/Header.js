function Header(props) {
  let account_or_login = null;
  let authorized = false;
  if (localStorage.getItem("is_authorized")) {
    authorized = localStorage.getItem("is_authorized");
  }
  if (authorized) {
    account_or_login = (
      <a href="/account" className="in_menu">
        <button>Личный кабинет</button>
      </a>
    )
  } else {
    account_or_login = (
      <a href="/login" className="in_menu">
        <button>Войти</button>
      </a>
    )
  }
  return (
    <div id="header-wrapper" style={{"margin": "0px", "width": "100%"}}>
        <nav id="header" style={{"width": "100%", "justifyContent": "space-between", "display": "flex"}}>
            <a href="/search" className="in_menu">
                <button>Поиск</button>
            </a>
            <a href="/" className="in_menu">
                <button>О проекте</button>
            </a>
            {account_or_login}
        </nav>
    </div>
  );
}

export default Header;
