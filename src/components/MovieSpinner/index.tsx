import { Box } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { SyncLoader } from "react-spinners";
import './MovieSpinner.scss';

type MovieSpinnerProps = {
    loading: boolean;
}

const MovieSpinner: FC<MovieSpinnerProps> = ({ loading }): ReactElement => {
    return (
        <Box className="movie-spinner" display={loading ? 'flex' : 'none'}>
            <SyncLoader color={"#39b0e4"} loading={loading} size={50} />
        </Box>
    )
}

export default MovieSpinner;
