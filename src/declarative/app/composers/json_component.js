import React from 'react';

// export default ({json = {}}) => (
//     <pre data-style="json_state">{JSON.stringify(json)}</pre>
// );

export default {
    "$compose": [
        ({json = {}}) => (
            <pre data-style="json_state">
                {JSON.stringify(json)}
            </pre>
        )
    ]
};