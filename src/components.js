import React from 'react';

export const Json = ({json = {}}) => (
    <pre data-style="json_state">
        {JSON.stringify(json)}
    </pre>
);

export const Root = () => (
    <div data-view="root"/>
);

// noinspection JSUnusedGlobalSymbols
export default {Json, Root};