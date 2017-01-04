'use strict';

const regex = {
    uuid: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
    hash: {
        sha1: '[a-f0-9]{40}'
    }
};

const isSha1 = value => value.match(new RegExp(regex.hash.sha1)) !== null;

export {
    regex,
    isSha1
};
