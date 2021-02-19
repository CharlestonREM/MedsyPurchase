import React, { forwardRef, useImperativeHandle, useContext } from 'react';
import { ModalContext } from 'contexts/modal/modal.provider'


import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core'

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

const SimpleModal = (props, ref) => {
    console.log('simpl modal called in containers/modal')
    //setup context for modal
    const { state, dispatch }: any = useContext(ModalContext);
    console.log('i am state', state);
    console.log('i am dispatch', dispatch)

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    //setup open and close hanlder for modal context
    const handleOpen = () => {
        console.log('handleOpen was just fired')
        dispatch({
            type: 'OPEN_MODAL',
            payload: {
                menu: true,
            },
        })
    }
    const handleClose = () => {
        dispatch({
            type: 'CLOSE_MODAL',
            payload: {
                menu: false,
            },
        })
    }



    // const [open, setOpen] = React.useState(false);


    // const handleOpen = () => {
    //     setOpen(true);
    // };


    // const handleClose = () => {
    //     setOpen(false);
    // };

    // useImperativeHandle(
    //     ref,
    //     () => ({
    //         handleOpen(pF1, pF2, value) {
    //             setOpen(true);
    //             console.log('i am pF1', pF1);
    //             console.log(this)
    //             // pF1();
    //             // pF2(value);
    //         },
    //         handleClose() {
    //             setOpen(false);
    //         },
    //         startOver(f1, f2, f2Arg) {
    //             f1();
    //             f2(f2Arg);
    //         }
    //     })
    // )



    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Want to start over?</h2>
            <p id="simple-modal-description">
                {state.modalContent}
            </p>
            <Button onClick={() => {
                handleClose();
            }}>Keep the Product</Button>
            <Button variant="contained" color="secondary" onClick={() => {
                console.log(props)
                //props.startOver()
                state.startOver.removeUpgrades()
                state.startOver.setFieldValue(state.startOver.newValue)
                handleClose();
                //todo --> figure out how to navigate back to step 3
            }}>Start Over</Button>

        </div>
    );



    return (
        <React.Fragment>
            <Modal
                open={state.isModalOpen}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </React.Fragment>
    );
}

export default SimpleModal;