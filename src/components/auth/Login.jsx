import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

import { authService } from "../../services/authService";
import { errorNotification } from "../../utils/notifications";

const Login = () => {
    const { register, handleSubmit, formState: { errors }} = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' });
    const navigate = useNavigate();

    const [forgottenPass, setForgottenPass] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState(null);
    
    const loginUser = (data) => {
        authService.login(data)
            .then((user) => {
                navigate('/', { state: { user } });
            })
            .catch(() => {
                errorNotification('Invalid username or password!');
            });
    };

    const sendRecoveryEmail = (data) => {
        setEmailSent(true);

        authService.sendRecoveryEmail(data)
            .catch(() => {
                errorNotification('Could not find your email. Please try again later.');
            });
    };

    const changePassword = (data) => {
        if (data.password !== data.confirmPassword) {
            setError('Passwords should match!');
            return;
        } else {
            setError(null);
        }

        authService.validateToken(data.token)
            .then(() => {
                authService.changePassword(data)
                    .then(() => {
                        setForgottenPass(false);
                        setEmailSent(false);
                        navigate('/login');
                    })
                    .catch(() => {
                        errorNotification('Could not change your password. Please try again later.');
                    });
            })
            .catch(() => {
                errorNotification('Could not change your password. Please try again later.');
            });
    }
    
    return (
        <section>
            <h1 className="title">Log In</h1>

                {!forgottenPass &&
                    <form method="POST" onSubmit={handleSubmit(loginUser)}>
                            <article className="my-5 flex flex-col items-center">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" {...register('username', { required: { value: true, message: 'Username is required!' }})} className="form-input" />
                                {errors.username && <p className="mb-5">{errors.username.message}</p>}
                            </article>

                            <article className="my-5 flex flex-col items-center">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" {...register('password', { required: { value: true, message: 'Password is required!' } })} className="form-input" />
                                {errors.password && <p className="mb-5">{errors.password.message}</p>}
                            </article>

                            <p>Forgotten password? <span onClick={() => setForgottenPass(true)} className="underline text-blue-300">Click here</span></p>
                            <input type="submit" value="Login" className="btn" />
                    </form>
                }

                {forgottenPass && !emailSent &&
                    <form method="POST" className="my-20" onSubmit={handleSubmit(sendRecoveryEmail)}>
                        <article className="my-5 flex flex-col items-center">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" {...register('email', { required: { value: true, message: 'email is required!' }})} className="form-input" />
                            <p>If you enter a valid email, we will send you a code that you can use to recover your password</p>
                            {errors.email && <p className="mb-5">{errors.email.message}</p>}
                        </article>

                        <input type="submit" value="Send email" className="btn" />
                    </form>
                }

                {emailSent &&
                    <form method="POST" className="my-20" onSubmit={handleSubmit(changePassword)}>
                        <article className="my-5 flex flex-col items-center">
                            <label htmlFor="token">Token</label>
                            <input type="text" name="token" {...register('token', { required: { value: true, message: 'token is required!' }})} className="form-input" />
                            {errors.token && <p className="mb-5">{errors.token.message}</p>}
                        </article>

                        <article className="my-5 flex flex-col items-center">
                            <label htmlFor="password">New Password</label>
                            <input type="password" name="password" {...register('password', { required: { value: true, message: 'Confirm password is required!' } })} className="form-input" />
                            {errors.password && <p className="mb-5">{errors.password.message}</p>}
                        </article>

                        <article className="my-5 flex flex-col items-center">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name="confirmPassword" {...register('confirmPassword', { required: { value: true, message: 'Confirm password is required!' } })} className="form-input" />
                            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                            {error && <p className="mb-5">{error}</p>}
                        </article>

                        <input type="submit" value="Change password" className="btn" />
                    </form>
                }
        </section>
    );
};

export default Login;