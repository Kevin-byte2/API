import { db } from './database/firebase.js';

async function run() {
    try {
        const snap = await db.usersCol.get();
        if (snap.empty) {
            console.log("No users found in database.");
        } else {
            console.log("Users in database:");
            snap.docs.forEach(doc => {
                const data = doc.data();
                console.log(`- Email: ${data.email}, Role: ${data.role}, Name: ${data.fullName}`);
            });
        }
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}
run();
