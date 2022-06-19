import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { discountService } from '../../services/discountService';
import { errorNotification } from '../../utils/notifications';

const CreateDiscount = () => {
    const { register, handleSubmit, formState: { errors }} = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' });
    const navigate = useNavigate();

    const [dateError, setDateError] = useState(false);

    const createDiscount = (discountData) => {
        if (discountData.end_date < discountData.start_date || new Date(discountData.end_date) < new Date()) {
            setDateError(true);
            return;
        }

        discountService.createOne(discountData)
            .then(() => {
                navigate('/my-discounts');
            })
            .catch(() => {
                errorNotification('Could not create your discount. Please try again later.');
            });
    };

    return (
        <section>
            <h1 className="title">Add Discount</h1>
            <form method="POST" className="my-20" onSubmit={handleSubmit(createDiscount)}>
                    <article className="my-5 flex flex-col items-center">
                        <label htmlFor="discount_percent">Discount percent</label>
                        <input type="number" name="discount_percent" {...register('discount_percent', { required: { value: true, message: 'Discount percent is required!' }})} className="form-input" />
                        {errors.discount_percent && <p className="mb-5">{errors.discount_percent.message}</p>}
                    </article>

                    <article className="my-5 flex flex-col items-center">
                        <label htmlFor="start_date">Start Date</label>
                        <input type="date" name="start_date" {...register('start_date', { required: { value: true, message: 'Start Date is required!' } })} className="form-input" />
                        {errors.start_date && <p className="mb-5">{errors.start_date.message}</p>}
                    </article>

                    <article className="my-5 flex flex-col items-center">
                        <label htmlFor="end_date">End Date</label>
                        <input type="date" name="end_date" {...register('end_date', { required: { value: true, message: 'End Date is required!' } })} className="form-input" />
                        {errors.end_date && <p className="mb-5">{errors.end_date.message}</p>}
                        {dateError && <p className="mb-5">End date should be after start date and not before today!</p>}
                    </article>

                    <input type="submit" value="Add Discount" className="btn" />
            </form>
        </section>
    );
};

export default CreateDiscount;