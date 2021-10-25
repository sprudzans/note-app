import Link from 'next/link';
import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography} from '@material-ui/core';

const Index = ({ notes }) => {
  return (
      <Grid container spacing={2}>
          <Grid item xs={12}>
              <h1>Notes</h1>
          </Grid>
          {notes.map(note => {
            return (
                <Grid item xs={12} lg={3} key={note._id}>
                  <Card>
                    <CardHeader
                        title={note.title}
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                          {note.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link href={`/notes/${note._id}`}>
                        <Button>View</Button>
                      </Link>
                      <Link href={`/notes/${note._id}/edit`}>
                        <Button>Edit</Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
            )
          })}
      </Grid>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch(process.env.host+'/api/notes');
  const { data } = await res.json();

  return { notes: data }
}

export default Index;