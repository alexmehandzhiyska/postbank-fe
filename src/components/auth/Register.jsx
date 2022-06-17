import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { authService } from '../../services/authService';

const Register = () => {
    const { register, handleSubmit, formState: { errors }} = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' });
    const navigate = useNavigate();

    const registerUser = (data) => {
        authService.register(data)
            .then((user) => {
                navigate('/', { state: { user } });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    return (
        <section className="py-10">
            <h1 className="title">Sign Up</h1>

            <form method="POST" className="my-20" onSubmit={handleSubmit(registerUser)}>
                <article className="my-5 flex flex-col items-center">
                    <label htmlFor="username">Username</label>
                    <input type="username" name="username" {...register('username', { required: { value: true, message: 'Username is required!' }})} className="form-input" />
                    {errors.username && <p>{errors.username.message}</p>}
                </article>
                
                <article className="my-5 flex flex-col items-center">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" {...register('email', { required: { value: true, message: 'Email is required!' }})} className="form-input" />
                    {errors.email && <p>{errors.email.message}</p>}
                </article>

                <article className="my-5 flex flex-col items-center">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" {...register('password', { required: { value: true, message: 'Please choose a password!' }})} className="form-input" />
                    {errors.password && <p>{errors.password.message}</p>}
                </article>

                <article className="my-5 flex flex-col items-center">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" {...register('confirmPassword', { required: { value: true, message: 'Please confirm your password!' }})} className="form-input" />
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </article>

                <p>Already registered? Log in <Link to="/login" className="underline text-blue-300">here</Link></p>

                <input type="submit" value="Register" className="btn" />
            </form>
        </section>
    );
};

export default Register;