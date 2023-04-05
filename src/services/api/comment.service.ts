import { BASE_URL } from './base_url';

export class CommentService {
    private static path = BASE_URL + '/patients/';
    private static headers = { 'Content-Type': 'application/json' };

    static async createComment(patientId: number, text: string) {
        try {
            const request = await fetch(this.path, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    text,
                    patientId,
                    createdAt: new Date(),
                }),
            });
            const { id } = await request.json();

            console.log('Comment added with ID: ', id);
        } catch (e) {
            console.error('Error adding Comment: ', e);
        }
    }
}
