import {queryParam} from './util';

// in ms, lowest possible is 16(60 fps)
export const TIME_PRECISION = parseInt(queryParam('int')) || 16;
