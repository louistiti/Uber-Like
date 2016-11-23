'use strict';

const log = {};

log.success = (value) => {
    console.log('\x1b[32m%s\x1b[0m', value);
};

log.info = (value) => {
    console.info('\x1b[36m%s\x1b[0m', value);
};

log.error = (value) => {
    console.error('\x1b[31m%s\x1b[0m', value);
};

log.title = (value) => {
    console.log('\n---\n\n\x1b[7m.: %s :.\x1b[0m\n', value.toUpperCase());
};

log.default = (value) => {
    console.log('%s', value);
};

export default log;
