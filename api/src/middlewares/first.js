module.exports = (req, res, next) => {
    // Disable from the header, else it makes hacker's life easier to know more about our system
    res.removeHeader('X-Powered-By');

    console.log('request', `${req.method} ${req.url}`);

    // Add next() to continue
    next();
};
