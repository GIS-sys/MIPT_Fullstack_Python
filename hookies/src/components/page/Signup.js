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
        <tr style={{"height": "33%", "border": "0px"}}>
          <td style={{"width": "33%", "border": "0px"}}></td>
          <td style={{"width": "33%", "border": "0px"}}>
            <form onSubmit={handleSubmit(registrationHandler)}>
              <div>
                  <label>Логин</label>
                  <p></p>
                  <input {...register('username', { required: true })} />
                  {errors.username && <p>Username is required.</p>}
              </div>
              <div>
                  <label>Пароль</label>
                  <p></p>
                  <input type="password" {...register('password', { pattern: /......*/, required: true })} />
                  {errors.password && <p>Password must be at least 5 symbols long.</p>}
              </div>
              <div>
                  <label>Полное имя (3 слова)</label>
                  <p></p>
                  <input {...register('fullname', { pattern: /.+ .+ .+/, required: true })} />
                  {errors.fullname && <p>Full name must consist of 3 words separated by space.</p>}
              </div>
              <div>
                  <label>Email</label>
                  <p></p>
                  <input {...register('email', { pattern: /.+@.+\..+/, required: true })} />
                  {errors.email && <p>Email format is wrong.</p>}
              </div>
              <div>
                  <label>Дата рождения</label>
                  <p></p>
                  <input type="date" {...register('date_of_birth', { required: true })} />
                  {errors.date_of_birth && <p>Date? I mean, just simple date...</p>}
              </div>
              <button>Зарегистрироваться</button>
            </form>
          </td>
          <td style={{"width": "33%", "border": "0px"}}></td>
        </tr>
      </tbody>
    </table>
  );
}

export default Signup;
