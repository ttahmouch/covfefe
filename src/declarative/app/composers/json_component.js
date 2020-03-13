import React from 'react';

// Make the props the view, response, and app states.
export default ({json = {}}) => (
    <pre data-style="json_state">
        {JSON.stringify(json)}
    </pre>
);

// export default {
//     "$compose": [
//         ({json = {}}) => (
//             <pre data-style="json_state">
//                 {JSON.stringify(json)}
//             </pre>
//         )
//     ]
// };