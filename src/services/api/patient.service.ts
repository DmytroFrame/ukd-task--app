import { IPatient } from '../../interfaces/IPatient.interface';
import { BASE_URL } from './base_url';

export class PatientService {
    private static path = BASE_URL + '/patients/';
    private static headers = { 'Content-Type': 'application/json' };

    static async getPatients(): Promise<IPatient[]> {
        const request = await fetch(this.path);
        return await request.json();
    }

    static async getPatient(id: number | undefined): Promise<IPatient> {
        const request = await fetch(this.path + id);
        return await request.json();
    }

    static async createPatient(patient: IPatient) {
        try {
            const request = await fetch(this.path, {
                method: 'POST',
                body: JSON.stringify(patient),
                headers: this.headers,
            });
            const { id } = await request.json();

            console.log('Document written with ID: ', id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }

    static async updatePatient(id: number | undefined, patient: IPatient) {
        const currentPatient =  await this.getPatient(id);
        Object.assign (currentPatient, patient)
        
        if (!id) console.error('No id provided');

        const request = await fetch(this.path, {
            method: 'PUT',
            body: JSON.stringify(currentPatient),
            headers: this.headers,
        });

        await request.json();
    }

    static async deletePatient(id: number | undefined) {
        if (!id) console.error('No id provided');

        try {
            const request = await fetch(`${this.path}/${id}`, {
                method: 'DELETE',
            });

            await request.text();
        } catch (e) {
            console.error('Error removing document: ', e);
        }
    }
}
