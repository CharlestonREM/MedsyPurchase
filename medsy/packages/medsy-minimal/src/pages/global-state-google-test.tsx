import React from 'react'
import { Typography } from '@material-ui/core'

import {
    useAsyncData,
    useGlobalState,
} from '@dr.pogodin/react-global-state';

/* Example of component relying on the global state. */

// function SampleComponent() {
//     const [value, setValue] = useGlobalState('sample.component', 0);
//     return (
//         <div>
//             <h1>`SampleComponent`</h1>
//             <button onClick={() => setValue(1 + value)}>
//                 {value}
//             </button>
//         </div>
//     );
// }

// /* Example of component relying on async data in the global state. */

// async function sampleDataLoader() {
//     return new Promise((resolve) => {
//         setTimeout(() => resolve(<Typography variant="h2">I am sample data</Typography>), 900);
//     });
// }

// function SampleAsyncComponent() {
//     const { data, loading } = useAsyncData('sample.async-component', sampleDataLoader);
//     return data;
// }




export interface GlobalStateGoogleTestProps {

}

const GlobalStateGoogleTest: React.FC<GlobalStateGoogleTestProps> = () => {
    return (
        <React.Fragment>
            <div>
                <h1>Global State Google Test</h1>
            </div>
            {/* <SampleComponent />
            <SampleAsyncComponent /> */}
        </React.Fragment>
    );
}

export default GlobalStateGoogleTest;