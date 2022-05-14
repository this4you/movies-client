import { Add } from '@mui/icons-material';
import { Stack, TextField, IconButton } from '@mui/material';
import React, { FC } from 'react';

type ActorsFormControlProps = {
    setActors: Function,
    actors: Array<string>
};


const ActorsFormControl: FC<ActorsFormControlProps> = ({ setActors, actors }) => {

    const [actorName, setActorName] = React.useState<string>("");

    const onKeyDown = (event) => {
        if (event.keyCode == 13) {
            event.preventDefault();
            addActorHandler();
        }
    }

    const addActorHandler = () => {
        if (actorName && !actors.includes(actorName)) {
            setActors([actorName, ...actors]);
        }
        setActorName("");
    }

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <TextField id="outlined-basic" className="form-input" label="Actor`s name" variant="outlined" onKeyDown={onKeyDown}
                value={actorName} onChange={(event) => setActorName(event.target.value)} />

            <IconButton onClick={addActorHandler} style={{ marginTop: "-17px" }} aria-label="delete">
                <Add />
            </IconButton>

        </Stack>
    )
}

export default ActorsFormControl;