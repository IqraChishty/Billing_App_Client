const requests = {
    REGISTER_USER: '/auth/signup',
    LOGIN_USER: '/auth/login',
    GET_USER: '/auth/getuser',
    CREATE_SLAB: '/slab/createslab',
    GET_USER_SLABS: '/slab/getslabs',
    ADD_RATE: '/rate/addrate',
    GET_USER_RATES: '/rate/getrates',
    GET_CHART_DATA: '/rate/chartdata'
};
export default requests;

const STATUSES = Object.freeze({
    IDLE: 'idle',
    LOADING: 'loading',
    ERROR: 'error',
    SUCCESS: 'success'
});

export { STATUSES };