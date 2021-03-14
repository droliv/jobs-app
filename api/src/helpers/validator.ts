class Validator {
    validEntries(data){
        if (!data.name || !data.email || !data.password || !data.birthdate || !data.type) {
            return false;
        }
        return this.isValidMail(data.email);
    }

    isValidMail(email) {
        const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (regex.test(email)) {
            return true; 
        }
        return false;
    }
}

export default new Validator();