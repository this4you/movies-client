
const processErrors = (asyncErrors, setError) => {
    for (let field in asyncErrors.fields) {
        const messageType = asyncErrors.fields[field];
        const message = getErrorTextByMessage(messageType);
        field = field.split('/')[1] || field.split('/')[0];
        setError(field as any, { type: 'validate', message })
    }
}

const getErrorTextByMessage = (type: string) => {
    return "TEST";
}

const formValidator = {
    processErrors,
    getErrorTextByMessage
}

export default formValidator;