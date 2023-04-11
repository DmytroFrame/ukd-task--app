import { Input } from '@mui/material';
import { Dispatch, SetStateAction, useContext } from 'react';

import classes from './styles.module.scss';
import { InformationContext } from '../../context';

interface IProps {
    modifiedObject: object;
    setModifiedObject: Dispatch<SetStateAction<any>>;
}

function EditPatientField({ modifiedObject, setModifiedObject }: IProps): JSX.Element {
    const { selectedPatient } = useContext(InformationContext);

    return (
        <div className={classes['edit-field']}>
            {Object.keys(modifiedObject).map((key: string) => {
                if (key === 'birthday') {
                    return (
                        <Input
                            key={key}
                            type="date"
                            onChange={(e) =>
                                setModifiedObject({
                                    ...modifiedObject,
                                    [key]: new Date(e.target.value),
                                })
                            }
                            placeholder={selectedPatient[key]}
                        />
                    );
                } else if (key === 'gender') {
                    return (
                        <select
                            key={key}
                            onChange={(e) => setModifiedObject({ ...modifiedObject, [key]: e.target.value })}
                        >
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                        </select>
                    );
                } else {
                    return (
                        <Input
                            key={key}
                            onChange={(e) => setModifiedObject({ ...modifiedObject, [key]: e.target.value })}
                            placeholder={selectedPatient[key]}
                        />
                    );
                }
            })}
        </div>
    );
}

export default EditPatientField;
