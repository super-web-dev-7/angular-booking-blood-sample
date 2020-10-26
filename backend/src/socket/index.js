import {doctorSocket} from './doctorSocket';

export const defineSocket = (io) => {
    doctorSocket(io);
}