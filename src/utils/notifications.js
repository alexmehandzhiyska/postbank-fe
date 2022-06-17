import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

export const errorNotification = (title = 'Error!') => {
  MySwal.fire({
    icon: 'error',
    title: <p>{title}</p>,
    didOpen: () => {
      MySwal.clickConfirm()
    }
  }).then(() => MySwal.fire(title, '', 'error'))
};

export const successNotification = (title = 'Success!') => {
  MySwal.fire({
    icon: 'success',
    title: <p>{title}</p>,
    didOpen: () => {
      MySwal.clickConfirm()
    }
  }).then(() => MySwal.fire(title, '', 'success'));
};

export const warningNotification = async (title = 'Warning!') => {
  const result = await MySwal.fire({
    title: <p>{title}</p>,
    icon: 'warning',
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Ok',
  });
  return result.isConfirmed;
};