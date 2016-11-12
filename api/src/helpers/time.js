'use strict';

const datetime = () => {
    const current = new Date();

    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    const time = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    return `${date} ${time}`;
};

export {
    datetime
};