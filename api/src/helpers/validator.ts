class Validator {
    validEntries(data){
        if (!data.name || !data.email || !data.password  || !data.type) {
            return false;
        }
        else if ((data.type === 'candidate') && (!data.birthdate)) {
            return false;
        } else {
            return this.isValidMail(data.email);
        }
    }

    isValidMail(email) {
        const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (regex.test(email)) {
            return true; 
        }
        return false;
    }

    isValidAge(date) {
        const age = ((Date.now() - new Date(date)) / (31557600000) | 0);
        if (age >= 50) {
            return true
        }
        return false
    }
}

export default new Validator();