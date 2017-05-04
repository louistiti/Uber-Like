const rule = {
    password: {
        minLength: 6
    }
};

const regex = {
    password: `.{${rule.password.minLength},}`,
    phone: '^0[67]\\d{8}$'
};

export {
    regex,
    rule
};
