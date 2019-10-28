import React, {Fragment} from 'react';

export const Json = ({json = {}}) => (
    <pre data-style="json_state">
        {JSON.stringify(json)}
    </pre>
);

export const Root = () => (
    <Fragment data-view="root"/>
);

// noinspection JSUnusedGlobalSymbols
export default {Json, Root};