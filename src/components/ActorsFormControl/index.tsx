import { Add } from '@mui/icons-material';
import { Stack, TextField, IconButton, Box, Chip } from '@mui/material';
import React, { FC } from 'react';
import "./ActorsFormControl.scss";
type ActorsFormControlProps = {
    setActors: Function,
    actors: Array<string>
};


const ActorsFormControl: FC<ActorsFormControlProps> = ({ setActors, actors }) => {

    const [actorName, setActorName] = React.useState<string>("");

    const onKeyDown = (event) => {
        if (event.keyCode === 13) {
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

    const deleteActor = (actorName) => {
        setActors(actors.filter(a => a != actorName));
    }

    return (
        <>
            <Stack direction="row" alignItems="center" spacing={2}>
                <TextField id="outlined-basic" className="form-input" label="Actor`s name" variant="outlined" onKeyDown={onKeyDown}
                    value={actorName} onChange={(event) => setActorName(event.target.value)} />

                <IconButton onClick={addActorHandler} style={{ marginTop: "-17px" }} aria-label="delete">
                    <Add />
                </IconButton>

            </Stack>
            <Box maxHeight={"82px"} overflow="auto" className="form-input" padding="10px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {actors.length > 0 ? actors.map(value =>
                    <Chip onClick={() => deleteActor(value)} className="actor-name" key={value} label={value} />) : <h4>No actors</h4>}
            </Box>
        </>
    )
}

export default ActorsFormControl;