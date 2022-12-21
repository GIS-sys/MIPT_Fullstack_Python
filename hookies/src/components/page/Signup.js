import { useForm } from 'react-hook-form';
import { apiRegister } from '../api/Api';


function registrationHandler(data) {
  let successRegistration = apiRegister(data["username"], data["password"], data["fullname"], data["email"], data["date_of_birth"]);
}

function Signup(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
            <form onSubmit={handleSubmit(registrationHandler)}>
              <div>
                  <label>Логин</label>
                  <input {...register('username', { required: true })} />
                  {errors.username && <p>Username is required.</p>}
              </div>
              <div>
                  <label>Пароль</label>
                  <input type="password" {...register('password', { pattern: /......*/, required: true })} />
                  {errors.password && <p>Password must be at least 5 symbols long.</p>}
              </div>
              <div>
                  <label>Полное имя (3 слова)</label>
                  <input {...register('fullname', { pattern: /.+ .+ .+/, required: true })} />
                  {errors.fullname && <p>Full name must consist of 3 words separated by space.</p>}
              </div>
              <div>
                  <label>Email</label>
                  <input {...register('email', { pattern: /.+@.+\..+/, required: true })} />
                  {errors.email && <p>Email format is wrong.</p>}
              </div>
              <div>
                  <label>Дата рождения</label>
                  <input type="date" {...register('date_of_birth', { required: true })} />
                  {errors.date_of_birth && <p>Date? I mean, just simple date...</p>}
              </div>
              <button>Зарегистрироваться</button>
            </form>
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

export default Signup;
