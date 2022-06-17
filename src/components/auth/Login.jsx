import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { authService } from "../../services/authService";

const Login = () => {
    const { register, handleSubmit, formState: { errors }} = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' });
    const navigate = useNavigate();
    
    const loginUser = (data) => {
        authService.login(data)
            .then((user) => {
                navigate('/', { state: { user } });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    return (
        <section className="py-10">
            <h1 className="title">Log In</h1>

            <form method="POST" className="my-20" onSubmit={handleSubmit(loginUser)}>
                <article className="my-5 flex flex-col items-center">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" {...register('username', { required: { value: true, message: 'Username is required!' }})} className="form-input" />
                    {errors.username && <p>{errors.username.message}</p>}
                </article>

                <article className="my-5 flex flex-col items-center">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" {...register('password', { required: { value: true, message: 'Please choose a password!' } })} className="form-input" />
                    {errors.password && <p>{errors.password.message}</p>}
                </article>

                {/* <p>Don't have an account yet? Register <Link to="/register" className="underline text-blue-300">here</Link></p> */}
                <p>Forgotten password? <Link to="/register" className="underline text-blue-300">Click here</Link></p>

                <input type="submit" value="Login" className="btn" />
            </form>
        </section>
    );
};

export default Login;