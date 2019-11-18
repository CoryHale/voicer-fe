import axiosWithAuth from '../components/axiosAuth';

export const GET_JOB_OFFERS_START = 'GET_JOB_OFFERS_START';
export const GET_JOB_OFFERS_SUCCESS = 'GET_JOB_OFFERS_SUCCESS';
export const GET_JOB_OFFERS_FAILED = 'GET_JOB_OFFERS_FAILED';

export const getApplications = jobId => dispatch => {
    dispatch({ type: GET_JOB_OFFERS_START });
    return axiosWithAuth()
        .get(`https://voicer-lambda-app-staging.herokuapp.com/api/jobs/${jobId}/offers`)
        //.get('http://localhost:4000/api/jobs')
        .then(res => {
            dispatch({
                type: GET_JOB_OFFERS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_JOB_OFFERS_FAILED,
                payload: err
            })
        })
};