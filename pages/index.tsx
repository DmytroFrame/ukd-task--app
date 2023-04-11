import { useEffect, useState } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import classes from '../scss/pages/index.module.scss';
import { IPatient } from '../src/interfaces/IPatient.interface';
import { InformationStateType } from '../src/types/general.types';
import { InformationContext } from '../src/context';
import InformationLayout from '../src/layouts/InformationLayout';
import Sidebar from '../src/layouts/Sidebar';
import EditPatientField from '../src/components/EditPatientField';
import AddPatientField from '../src/components/AddPatientField/Component';
import PatientsList from '../src/components/PatientsList';
import PatientMedicalBook from '../src/components/PatientMedicalBook';
import PatientJournal from '../src/components/PatientJournal';
import { PatientService } from '../src/services/api/patient.service';

const newPatientDataTemplate = {
    firstName: '',
    lastName: '',
    birthday: '',
    gender: 'MALE',
    country: '',
    state: '',
    address: '',
    comments: [],
};

const editPatientDataTemplate = {
    birthday: '',
    gender: 'MALE',
    country: '',
    state: '',
    address: '',
};

const Home: NextPage = () => {
    const [patientsData, setPatientsData] = useState<IPatient[]>();
    const [selectedPatient, setSelectedPatient] = useState<IPatient>();
    const [informationState, setInformationState] = useState<InformationStateType>('ViewPatient');
    const [searchInput, setSearchInput] = useState<string>('');
    const [newPatientData, setNewPatientData] = useState<any>(newPatientDataTemplate);
    const [editPatientTemplate, setEditPatientTemplate] = useState<any>(editPatientDataTemplate);

    const fetchPatients = async (): Promise<void> => {
        const patients: IPatient[] = await PatientService.getPatients();
        setPatientsData(patients);
        !selectedPatient && setSelectedPatient(patients[0]);
    };

    const filterPatients = (): IPatient[] | undefined =>
        patientsData?.filter((patient: IPatient) => {
            const fullname = `${patient.firstName} ${patient.lastName}`;
            return fullname.toLowerCase().includes(searchInput.toLowerCase());
        });

    useEffect(() => {
        fetchPatients();
    }, []);

    useEffect(() => {
        setSelectedPatient(() => {
            return patientsData && patientsData.find((patient: IPatient) => patient.id === selectedPatient?.id);
        });
    }, [patientsData]);

    const onSelectPatientHandle = (patient: IPatient): void => setSelectedPatient(patient);

    const onCreatePatientHandle = (): void => {
        const incapsulatedData = {
            comments: [],
        };

        PatientService.createPatient(Object.assign(newPatientData, incapsulatedData)).then(_ => {
            fetchPatients();
            setInformationState('ViewPatient');
        });
    };
    const onUpdatePatientHandle = (): void => {
        Object.keys(editPatientTemplate).forEach((key) => {
            if (editPatientTemplate[key] === '') {
                delete editPatientTemplate[key];
            }
        });
        PatientService.updatePatient(selectedPatient?.id, editPatientTemplate).then(_ => {
            setInformationState('ViewPatient');
            setEditPatientTemplate(editPatientDataTemplate);
            fetchPatients();
        });
    };

    const onSwitchStateToPatientAddHandle = (): void => setInformationState('AddPatient');

    return (
        <div className={classes.wrapper}>
            <Head>
                <title>UKD Task App</title>
            </Head>

            <Sidebar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                onButtonClickHandler={onSwitchStateToPatientAddHandle}
            >
                <PatientsList onPatientClickHandler={onSelectPatientHandle} patients={filterPatients} />
            </Sidebar>
            <InformationContext.Provider
                value={{
                    informationState,
                    setInformationState,
                    selectedPatient,
                    fetchPatients,
                    onUpdatePatientHandle,
                }}
            >
                <InformationLayout>
                    {informationState === 'EditPatient' && (
                        <EditPatientField
                            modifiedObject={editPatientTemplate}
                            setModifiedObject={setEditPatientTemplate}
                        />
                    )}

                    {informationState === 'AddPatient' && (
                        <AddPatientField
                            newPatientData={newPatientData}
                            setNewPatientData={setNewPatientData}
                            onCreatePatientHandle={onCreatePatientHandle}
                        />
                    )}

                    {informationState === 'ViewPatient' && (
                        <>
                            <PatientMedicalBook />
                            <PatientJournal />
                        </>
                    )}
                </InformationLayout>
            </InformationContext.Provider>
        </div>
    );
};

export default Home;
