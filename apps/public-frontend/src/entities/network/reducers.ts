import { createReducer } from 'deox';
import { compose, clone, view, ifElse, isNil, identity, always, over } from 'ramda';

import {
    setRequest,
    setToken,
} from './actions';
import { createEmptyRequest } from './utils';
import { INetworkState, IRequestData, IRequest } from './types';

const initialState: INetworkState = {
    accessToken: '',
    refreshToken: '',
    requests: {},
};

export default createReducer(initialState, handle => ([
    handle(setRequest, (state, { payload: { key, status, data } }) => {
        const request = compose<
            IRequest,
            IRequestData | undefined,
            IRequestData,
            IRequestData
        >(
            clone,
            ifElse(
                isNil,
                always(createEmptyRequest()),
                identity,
            ),
            view<IRequest, IRequestData>(key)
        )(state.requests);
        request.status = status;
        request.data = data || request.data;
        
        state.requests = over(key, () => request, state.requests);

        return state;
    }),
    handle(setToken, (state, { payload: { type, value } }) => {
        return {
            ...state,
            [`${type}Token`]: value,
        };
    }),
]));
