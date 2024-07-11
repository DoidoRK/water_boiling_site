import { Box, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const CenteredPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


const LoadingComponent: React.FC = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <CenteredPaper elevation={3}>
                <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                >
                    <CircularProgress />
                    <Typography>
                        Waiting for server connection
                    </Typography>
                </Stack>
            </CenteredPaper>
        </Box>
    );
}

export default LoadingComponent;