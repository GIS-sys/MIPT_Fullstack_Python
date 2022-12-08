import { useForm } from 'react-hook-form';
import { apiLogin } from '../api/Api';


function loginHandler(data) {
  apiLogin(data["username"], data["password"]);
}

function Login(props) {
  return (
    <table style={{'tableLayout': 'fixed', 'width': '100%', 'height': '100%'}}>
      <tbody>
        <tr style={{"height": "33%"}}>
          <td style={{"width": "33%"}}></td>
          <td style={{"width": "33%"}}></td>
          <td style={{"width": "33%"}}></td>
        </tr>
        <tr style={{"height": "33%"}}>
          <td style={{"width": "33%"}}></td>
          <td style={{"width": "33%"}}>
            <form onSubmit={(e) =>{
                e.preventDefault()
                let formData = new FormData(e.target)
                loginHandler(Object.fromEntries(formData))
            }}>
              <div>
                  <label>Логин</label>
                  <input name="username" id="username"/>
              </div>
              <div>
                  <label>Пароль</label>
                  <input name="password" id="password"/>
              </div>
              <button>Авторизоваться</button>
            </form>
            <a href="/signup">
              <button>Зарегистрироваться</button>
            </a>
          </td>
          <td style={{"width": "33%"}}></td>
        </tr>
        <tr style={{"height": "33%"}}>
          <td style={{"width": "33%"}}></td>
          <td style={{"width": "33%"}}></td>
          <td style={{"width": "33%"}}></td>
        </tr>
      </tbody>
    </table>
  );
}

export default Login;
