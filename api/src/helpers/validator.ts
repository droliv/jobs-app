class Validator {
    validEntries(data){
        if (!data.name || !data.email || !data.password || !data.birthdate || !data.type) {
            return false;
        }
        return true;
    }
}

export default new Validator();