import React, { useEffect } from 'react';
import { Close } from '@mui/icons-material';
import { useMovies, useAppSelector } from '../../hooks';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem, ListItemText, Divider, Slide, Paper } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useNavigate, useParams } from 'react-router-dom';
import './MovieInfoPage.scss';



const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function MovieInfoPage() {
  const { movieId } = useParams();
  const { showMovie } = useMovies();
  const { currentMovie } = useAppSelector((state) => state.movies);
  const actorsList = currentMovie?.actors || [];

  useEffect(() => {
    if (movieId) {
      showMovie(movieId)
    }
  }, [movieId]);


  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate('/movies');
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435, height: 435 } }}
      maxWidth='xs'
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {`${currentMovie?.title} // ${currentMovie?.year} // ${currentMovie?.format}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <h3 className="actors-title">Actors</h3>
      {actorsList.length === 0 ? <h5>No data</h5> : (
        <List>
          {actorsList.map((actor:any) => (
            <React.Fragment key={actor.id}>
              <ListItem>
                <ListItemText primary={actor.name} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Dialog>
  )
}

export default MovieInfoPage;
