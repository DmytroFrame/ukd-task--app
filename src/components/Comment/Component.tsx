import { useContext, useState } from 'react';
import { getDateByDefaultFormat } from '../../utils/date/date.service';
import classes from './styles.module.scss';
import { InformationContext } from '../../context';
import { CommentService } from '../../services/api/comment.service';

const EDIT_ICON = (
    <svg
        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="EditIcon"
    >
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
    </svg>
);
const DELETE_ICON = (
    <svg
        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="DeleteIcon"
    >
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
    </svg>
);

interface IProps {
    id: number;
    content: string;
    date: string;
}

function Comment({ content, date, id }: IProps): JSX.Element {
    const [isEdit, setIsEdit] = useState(false);
    const [editInput, setEditInput] = useState('');
    const { fetchPatients, selectedPatient } = useContext(InformationContext);

    async function onDelete() {
        CommentService.deleteComment(id).then(function () {
            fetchPatients();
        });
    }

    async function onSave() {
        CommentService.updateComment(id, selectedPatient.id, editInput).then(function () {
            setIsEdit(!isEdit);
            fetchPatients();
        });
    }

    if (isEdit) {
        return (
            <div className={classes.comment}>
                <div className={classes.buttons}>
                    <h3 className={classes.comment__date}>{getDateByDefaultFormat(date)}</h3>
                    <div style={{ display: 'flex' }}>
                        <div className={classes.button} onClick={() => setIsEdit(!isEdit)}>
                            Close {EDIT_ICON}
                        </div>
                        <div className={classes.button} onClick={() => onSave()}>
                            Save {DELETE_ICON}
                        </div>
                    </div>
                </div>
                <textarea className={classes.edittext} onChange={({ target }) => setEditInput(target.value)}>
                    {content}
                </textarea>
            </div>
        );
    }

    return (
        <div className={classes.comment}>
            <div className={classes.buttons}>
                <h3 className={classes.comment__date}>{getDateByDefaultFormat(date)}</h3>
                <div style={{ display: 'flex' }}>
                    <div className={classes.button} onClick={() => setIsEdit(!isEdit)}>
                        Edit {EDIT_ICON}
                    </div>
                    <div className={classes.button} onClick={() => onDelete()}>
                        Delete {DELETE_ICON}
                    </div>
                </div>
            </div>

            <p className={classes.comment__content}>{content}</p>
        </div>
    );
}

export default Comment;
