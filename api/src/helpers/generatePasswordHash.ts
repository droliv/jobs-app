import bcrypt from 'bcrypt-nodejs';

const passwordHash = async (password) => {
    const salt = await bcrypt.genSaltSync(5);
    return bcrypt.hashSync(password, salt);
};

export { passwordHash };
  