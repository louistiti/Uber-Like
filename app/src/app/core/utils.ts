const fromSecsToDate = (secs: number) => {
    const date = new Date();
    date.setSeconds(secs);

    return date;
};

export {
    fromSecsToDate
};
