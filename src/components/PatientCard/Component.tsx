import classes from './styles.module.scss';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import { IPatient } from '../../interfaces/IPatient.interface';
import { getDateByDefaultFormat } from '../../utils/date/date.service';
import React from 'react';

function PatientCard({ firstName, lastName, birthday, gender }: IPatient): JSX.Element {
    const iconStyles = {
        fill: '#f4f4f4',
        width: '45px',
        height: '45px',
    };

    return (
        <div className={classes['patient-card']}>
            <div className={classes['patient-data']}>
                <div className={classes['patient-data__fullname']}>
                    {firstName} {lastName}
                </div>
                <div className={classes['patient-data__birth']}>{`${getDateByDefaultFormat(birthday)}`}</div>
            </div>
            <div className={classes['patient-card__avatar']}>
                {gender === 'MALE' ? <ManIcon sx={iconStyles} /> : <WomanIcon sx={iconStyles} />}
            </div>
        </div>
    );
}

export default PatientCard;
