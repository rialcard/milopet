import path from 'path';
import { google } from 'googleapis';

const sheets = google.sheets('v4');

async function addRowToSheet(auth, spreadsheetId, values) {
    const request = {
        spreadsheetId,
        range: 'reservas',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: [values],
        },
        auth,
    }

    try {
        const response = (await sheets.spreadsheets.values.append(request).data);
        return response;
    } catch (error) {
        console.error(error)
    }
}

const appendToSheet = async (data) => {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.CLIENT_EMAIL,
                private_key: process.env.PRIVATE_KEY,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });      

        const authClient = await auth.getClient();
        const spreadsheetId = '1ZBU7NZtPPxW3bYBj0xwPcPWKsQL2buXPCRq9axJrY60';

        await addRowToSheet(authClient, spreadsheetId, data);
        return 'Datos correctamente agregados';
    } catch (error) {
        console.error('error en appendToSheet:', error);
    }
};

export default appendToSheet;