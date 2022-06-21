export const getUserStatus = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    return user;
};

export const validatePassword = (password) => {
    const uppercasePattern = /[A-Z]+/;
    const digitPattern = /\d+/;
    const specialPattern = /\W+/;

    return uppercasePattern.test(password) && digitPattern.test(password) && specialPattern.test(password) && password.length >= 8;
};

export const validateConfirmPassword = (password, confirmPassword) => password === confirmPassword;

export const formatCardDate = (date) => {
    const [year, month] = date.split('-');
    return `${month}/${year.slice(2)}`;
};

export const formatDate = (date) => {
    const [year, month, day] = date.slice(0, 10).split('-');
    return `${day}.${month}.${year}`;
};
