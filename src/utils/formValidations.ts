
const processErrors = (asyncErrors, setError) => {
    for (let field in asyncErrors.fields) {
        const messageType = asyncErrors.fields[field];
        const message = getErrorTextByMessage(messageType);
        field = field.split('/')[1] || field.split('/')[0];
        setError(field as any, { type: 'validate', message })
    }
}

const getErrorTextByMessage = (type: string) => {
    let message = "";
    switch (type) {
        case "MOVIE_EXISTS":
            message = "Movie is exists!"
            break;
        case "AUTHENTICATION_FAILED":
            message = "Authentication faliled! Change your login or email"
            break;
        default:
            message = "Unexpected error"
            break;
    };
    return message;
}

const formValidator = {
    processErrors,
    getErrorTextByMessage
}

export default formValidator;