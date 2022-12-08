function Header(props) {
  let account_or_login = null;
  let authorized = false;
  if (localStorage.getItem("is_authorized")) {
    authorized = localStorage.getItem("is_authorized");
  }
  if (authorized) {
    account_or_login = (
      <a href="/account">
        <button>Личный кабинет</button>
      </a>
    )
  } else {
    account_or_login = (
      <a href="/login">
        <button>Войти</button>
      </a>
    )
  }
  return (
    <div id="header-wrapper" style={{"margin": "0px"}}>
		  <nav id="header">
        <a href="/search">
          <button>Поиск</button>
        </a>
        <a href="/">
          <button>О проекте</button>
        </a>
        {account_or_login}
      </nav>
	  </div>
  );
}

export default Header;
