import React, { useReducer, createContext } from 'react';
//import mui components need for figma wireframe
import { Button, Typography } from '@material-ui/core';

export interface ReviewInfoProps {

}

const ReviewInfo: React.FC<ReviewInfoProps> = (props) => {
    return (
        <section>
            <Typography>title info </Typography>
            <ul>
                <li><strong>list key</strong>list value </li>
            </ul>
            <Button>Update</Button>
        </section>
    );
}

export default ReviewInfo;