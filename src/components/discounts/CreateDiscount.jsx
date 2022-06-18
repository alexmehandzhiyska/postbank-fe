import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { discountService } from '../../services/discountService';
import { errorNotification } from '../../utils/notifications';

const CreateDiscount = () => {
    const { register, handleSubmit, formState: { errors }} = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' });
    const navigate = useNavigate();

    const createDiscount = (discountData) => {
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
            <form method="POST" className="my-20" onSubmit={handleSubmit(createDiscount)}>
                    <article className="my-5 flex flex-col items-center">
                        <label htmlFor="discount_percent">Discount percent</label>
                        <input type="number" name="discount_percent" {...register('discount_percent', { required: { value: true, message: 'Discount percent is required!' }})} className="form-input" />
                        {errors.discount_percent && <p>{errors.discount_percent.message}</p>}
                    </article>

                    <article className="my-5 flex flex-col items-center">
                        <label htmlFor="start_date">Start Date</label>
                        <input type="date" name="start_date" {...register('start_date', { required: { value: true, message: 'Start Date is required!' } })} className="form-input" />
                        {errors.start_date && <p>{errors.start_date.message}</p>}
                    </article>

                    <article className="my-5 flex flex-col items-center">
                        <label htmlFor="end_date">End Date</label>
                        <input type="date" name="end_date" {...register('end_date', { required: { value: true, message: 'End Date is required!' } })} className="form-input" />
                        {errors.end_date && <p>{errors.end_date.message}</p>}
                    </article>

                    <input type="submit" value="Add Discount" className="btn" />
            </form>
        </section>
    );
};

export default CreateDiscount;