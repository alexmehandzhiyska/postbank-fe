import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { authService } from "../../services/authService";
import { useState } from "react";

const Login = () => {
    const { register, handleSubmit, formState: { errors }} = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' });
    const navigate = useNavigate();

    const [forgottenPass, setForgottenPass] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    
    const loginUser = (data) => {
        authService.login(data)
            .then((user) => {
                navigate('/', { state: { user } });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const sendRecoveryEmail = (data) => {
        setEmailSent(true);

        authService.sendRecoveryEmail(data)
            .catch((err) => {
                console.log(err);
            });
    };

    const changePassword = (data) => {
        console.log(data);

        authService.changePassword(data)
            .then(() => {
                authService.changePassword(data)
                    .then((userData) => {
                        console.log(userData);
                        navigate('/', { state: { user: userData } });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    return (
        <section className="py-10">
            <h1 className="title">Log In</h1>

                {!forgottenPass &&
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

                            <p>Forgotten password? <button onClick={() => setForgottenPass(true)} className="underline text-blue-300">Click here</button></p>
                            <input type="submit" value="Login" className="btn" />
                    </form>
                }

                {forgottenPass && !emailSent &&
                    <form method="POST" className="my-20" onSubmit={handleSubmit(sendRecoveryEmail)}>
                        <article className="my-5 flex flex-col items-center">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" {...register('email', { required: { value: true, message: 'email is required!' }})} className="form-input" />
                            <p>If you enter a valid email, we will send you a code that you can use to recover your password</p>
                            {errors.email && <p>{errors.email.message}</p>}
                        </article>

                        <input type="submit" value="Send email" className="btn" />
                    </form>
                }

                {emailSent &&
                    <form method="POST" className="my-20" onSubmit={handleSubmit(changePassword)}>
                        <article className="my-5 flex flex-col items-center">
                            <label htmlFor="token">Token</label>
                            <input type="text" name="token" {...register('token', { required: { value: true, message: 'token is required!' }})} className="form-input" />
                            {errors.token && <p>{errors.token.message}</p>}
                        </article>

                        <article className="my-5 flex flex-col items-center">
                            <label htmlFor="password">New Password</label>
                            <input type="password" name="password" {...register('password', { required: { value: true, message: 'Confirm password is required!' } })} className="form-input" />
                            {errors.password && <p>{errors.password.message}</p>}
                        </article>

                        <article className="my-5 flex flex-col items-center">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name="confirmPassword" {...register('confirmPassword', { required: { value: true, message: 'Confirm password is required!' } })} className="form-input" />
                            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                        </article>

                        <input type="submit" value="Change password" className="btn" />
                    </form>
                }
        </section>
    );
};

export default Login;