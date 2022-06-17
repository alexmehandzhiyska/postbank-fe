import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

import { authService } from '../../services/authService';
import { formatDate, validatePassword } from "../../utils/utils";

const Register = () => {
    const { register, handleSubmit, formState: { errors }} = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const registerUser = (data) => {
        data.password != data.confirmPassword ? setError('Passwords should match!') : setError(null);
        data.cardExpiryDate = formatDate(data.cardExpiryDate);

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
                    <input type="password" name="password" {...register('password', { required: { value: true, message: 'Password is required!' }, validate: validatePassword })} className="form-input" />
                    {errors.password && <p>{errors.password.message}</p>}
                    {errors.password && errors.password.type === 'validate' && <p>Your password should contain at least 1 uppercase letter, 1 digit, and 1 special character!</p>}
                </article>

                <article className="my-5 flex flex-col items-center">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" {...register('confirmPassword', { required: { value: true, message: 'Confirm password is required!' } })} className="form-input" />
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                    {error && <p>{error}</p>}
                </article>

                <article className="my-5 flex flex-col items-center">
                    <label htmlFor="phone">Phone number</label>
                    <input type="text" name="phone" {...register('phone', { required: { value: true, message: 'Phone number is required!' }, pattern: { value: /^0|(\+359)/, message: 'Invalid phone number!' } })} className="form-input" />
                    {errors.phone && <p>{errors.phone.message}</p>}
                </article>

                <article className="my-5 flex flex-col items-center">
                    <label htmlFor="cardNumber">Credit / Debit card number</label>
                    <input type="text" name="cardNumber" {...register('cardNumber', { required: { value: true, message: 'Card number is required!' }})} className="form-input" />
                    {errors.cardNumber && <p>{errors.cardNumber.message}</p>}
                </article>

                <article className="my-5 flex flex-col items-center">
                    <label htmlFor="cardExpiryDate">Credit / Debit card expiry date</label>
                    <input type="month" name="cardExpiryDate" {...register('cardExpiryDate', { required: { value: true, message: 'Expiry date is required!' }})} className="form-input" />
                    {errors.cardExpiryDate && <p>{errors.cardExpiryDate.message}</p>}
                </article>

                <p>Already registered? Log in <Link to="/login" className="underline text-blue-300">here</Link></p>

                <input type="submit" value="Register" className="btn" />
            </form>
        </section>
    );
};

export default Register;