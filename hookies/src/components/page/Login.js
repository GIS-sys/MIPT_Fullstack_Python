import { useForm } from 'react-hook-form';
import { apiLogin } from '../api/Api';


function loginHandler(data) {
  apiLogin(data["username"], data["password"]);
}

function Login(props) {
  return (
    <table style={{'tableLayout': 'fixed', 'width': '100%', 'height': '100%'}}>
      <tbody>
        <tr style={{"height": "33%", "border": "0px"}}>
          <td style={{"width": "33%", "border": "0px"}}></td>
          <td style={{"width": "33%", "border": "0px"}}>
            <form onSubmit={(e) =>{
                e.preventDefault()
                let formData = new FormData(e.target)
                loginHandler(Object.fromEntries(formData))
            }}>
              <div>
                  <label>Логин</label>
                  <p></p>
                  <input name="username" id="username"/>
              </div>
              <div>
                  <label>Пароль</label>
                  <p></p>
                  <input name="password" id="password"/>
              </div>
              <button>Авторизоваться</button>
            </form>
            <br></br>
            <a href="/signup">
              <button>Зарегистрироваться</button>
            </a>
          </td>
          <td style={{"width": "33%", "border": "0px"}}></td>
        </tr>
      </tbody>
    </table>
  );
}

export default Login;
