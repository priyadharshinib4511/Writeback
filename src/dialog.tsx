import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Box, Container, Grid, Paper } from '@mui/material';



const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

/*const useStyles: any =  makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));*/


function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };





    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Select DataSource</DialogTitle>




            <Container>
                <Grid container spacing={3}>

                    <Grid item xs={12} sm={6} md={4}>

                        <Box display="flex" flexDirection="column" alignItems="center">
                            <img
                                src="data:image/png;base64,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"
                                alt="Placeholder"
                                style={{ width: '150px', height: '50px', marginBottom: '16px' }}
                            />
                            <Typography variant="body1" align="center">Azure Sql</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <img
                                src="data:image/jpeg;base64,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"
                                alt="Placeholder"
                                style={{ width: '150px', height: '50px', marginBottom: '16px' }}
                            />
                            <Typography variant="body1" align="center">Snowflake</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <img
                                src="data:image/png;base64,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"
                                alt="Placeholder"
                                style={{ width: '150px', height: '50px', marginBottom: '16px' }}
                            />
                            <Typography variant="body1" align="center">Databricks</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

        </Dialog>
    );
}

export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                WriteBack
            </Button>
            <br />
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
    
}
