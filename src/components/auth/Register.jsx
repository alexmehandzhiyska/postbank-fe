import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { authService } from '../../services/authService';
import { formatCardDate, validatePassword } from '../../utils/utils';
import { errorNotification } from '../../utils/notifications';

const Register = () => {
    const { register, handleSubmit, formState: { errors }} = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const registerUser = (data) => {
        if (data.password !== data.confirmPassword) {
            setError('Passwords should match!');
            return;
        } else {
            setError(null);
        }

        data.valid_thru = formatCardDate(data.valid_thru);

        authService.register(data)
            .then((user) => {
                navigate('/', { state: { user } });
            })
            .catch(() => {
                errorNotification('Invalid register data. Please try again.');
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
                    <label htmlFor="phone_number">Phone number</label>
                    <input type="text" name="phone_number" {...register('phone_number', { required: { value: true, message: 'Phone number is required!' }, pattern: { value: /^0|(\+359)/, message: 'Invalid phone number!' } })} className="form-input" />
                    {errors.phone_number && <p>{errors.phone_number.message}</p>}
                </article>

                <article className="my-5 flex flex-col items-center">
                    <label htmlFor="card_number">Credit / Debit card number</label>
                    <input type="text" name="card_number" {...register('card_number', { required: { value: true, message: 'Card number is required!' }})} className="form-input" />
                    {errors.card_number && <p>{errors.card_number.message}</p>}
                </article>

                <article className="my-5 flex flex-col items-center">
                    <label htmlFor="valid_thru">Credit / Debit card expiry date</label>
                    <input type="month" name="valid_thru" {...register('valid_thru', { required: { value: true, message: 'Expiry date is required!' }})} className="form-input" />
                    {errors.valid_thru && <p>{errors.valid_thru.message}</p>}
                </article>

                <p>Already registered? Log in <Link to="/login" className="underline text-blue-300">here</Link></p>

                <input type="submit" value="Register" className="btn" />
            </form>
        </section>
    );
};

export default Register;