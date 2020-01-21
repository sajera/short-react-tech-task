
// outsource dependencies
import _ from 'lodash';

// local dependencies
import chatMock from './chat.mock';

// NOTE primitive emulation of server side response using for lazy loading
export const instanceAPI = {
    getFilteredPage: ({ page = 0, size = 10 }) => new Promise(resolve => {
        const list = _.sortBy(chatMock, 'timestamp').reverse();
        const pages = _.chunk(list, size);
        const results = {
            page,
            size,
            content: pages[page],
            totalPages: _.size(pages),
            totalElements: _.size(list),
        };
        setTimeout(resolve, randomDelay(1.5), results);
    }),
    addMessage: comment => new Promise(resolve => {
        chatMock.push(comment);
        setTimeout(resolve, randomDelay(0.5), {});
    }),
};

/**
 * returns random count of ms
 * @name randomDelay
 * @param {Number} max
 * @return {number}
 */
const randomDelay = max => (Math.random() * Math.floor(max)) * 1000;
