import { useContext, useEffect, useState } from 'react';
import { InformationContext } from '../../context';
import { IPatient } from '../../interfaces/IPatient.interface';
import DetailedInformationLayout from '../../layouts/DetailedInformationLayout/Component';
import { getDateByDefaultFormat } from '../../utils/date/date.service';
import classes from './styles.module.scss';

function PatientMedicalBook(): JSX.Element {
    const [patient, setPatient] = useState<IPatient>();
    const { selectedPatient }: { selectedPatient: IPatient } = useContext(InformationContext);

    useEffect(() => {
        setPatient(() => selectedPatient);
    }, [patient]);

    return (
        <DetailedInformationLayout>
            <div className={classes['intformation-description']}>
                <div className={classes['intformation-description__item']}>
                    Date of birth: {selectedPatient && getDateByDefaultFormat(selectedPatient.birthday)}
                </div>
                <div className={classes['intformation-description__item']}>
                    Sex: {selectedPatient && selectedPatient.gender}
                </div>
                <div className={classes['intformation-description__item']}>
                    Country: {selectedPatient && selectedPatient.country}
                </div>

                {selectedPatient?.state && (
                    <div className={classes['intformation-description__item']}>
                        State: {selectedPatient && selectedPatient.state}
                    </div>
                )}

                <div className={classes['intformation-description__item']}>
                    Adress: {selectedPatient && selectedPatient.address}
                </div>
            </div>
        </DetailedInformationLayout>
    );
}

export default PatientMedicalBook;
