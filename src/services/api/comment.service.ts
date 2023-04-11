import { BASE_URL } from './base_url';

export class CommentService {
    private static path = BASE_URL + '/comments/';
    private static headers = { 'Content-Type': 'application/json' };

    static async createComment(patientId: number, text: string) {
        try {
            const request = await fetch(this.path, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    text,
                    patientId,
                    createdAt: new Date().toJSON(),
                }),
            });
            const { id } = await request.json();

            console.log('Comment added with ID: ', id);
        } catch (e) {
            console.error('Error adding Comment: ', e);
        }
    }

    static async updateComment(id: number, patientId: number, text: string) {
        if (!id) console.error('No id provided');

        const request = await fetch(this.path, {
            method: 'PUT',
            body: JSON.stringify({
                id,
                patientId,
                text,
                createdAt: new Date(),
            }),
            headers: this.headers,
        });

        await request.json();
    }

    static async deleteComment(id: number) {
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
