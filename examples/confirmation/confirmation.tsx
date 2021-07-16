import 'confirmation.module.css';
import { Modal } from 'async-modals';

interface ConfirmationDialogModalData {
    title: string;
    message: string;
}

// The modal returns true if the user confirms the action, and false otherwise
const ConfirmationDialogModal: Modal<ConfirmationDialogModalData, boolean> = ({data, submit, cancel}) => (
    <div className={'confirmation_modal'}>
        <h3>{data.title}</h3>
        <p>{data.message}</p>
    </div>
)