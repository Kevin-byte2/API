import { db } from './database/firebase.js';

async function run() {
    const email = 'balquinkevinconeal27@gmail.com';
    try {
        const snap = await db.usersCol.where('email', '==', email).limit(1).get();
        if (snap.empty) {
            console.log("No user found with email:", email);
            process.exit(1);
        }
        const docRef = snap.docs[0].ref;
        await docRef.update({ role: 'Admin' });
        console.log("Success! Updated role to Admin for:", email);
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}
run();
