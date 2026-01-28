// assets/js/core/db.js
import { db, auth } from './firebase-config.js';
import { 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    query, 
    where, 
    updateDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// !!! هام جداً: ضع إيميلك هنا لتكون أنت الأدمن !!!
const ADMIN_EMAIL = "jehad6004@gmail.com"; 

export class CloudDB {
    
    // الاتصال هنا وهمي لأن فايربيس متصل دائماً
    async connect() { return true; }

    async add(collectionName, data) {
        try {
            // نضيف دائماً معلومات المالك والوقت
            const docRef = await addDoc(collection(db, collectionName), {
                ...data,
                userId: auth.currentUser.email, // نربط البيانات بالإيميل
                createdAt: Date.now()
            });
            return docRef.id;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async put(collectionName, data) {
        // للتحديث (مثل سحب وإفلات المهام)
        try {
            const taskRef = doc(db, collectionName, data.id);
            // نحذف الـ ID من البيانات لأنه موجود في المرجع
            const { id, ...updateData } = data; 
            await updateDoc(taskRef, updateData);
        } catch (e) {
            console.error("Error updating: ", e);
        }
    }

    async getAll(collectionName) {
        try {
            const user = auth.currentUser;
            if (!user) return [];

            let q;

            // اللحظة الحاسمة: هل أنت الأدمن؟
            if (user.email === ADMIN_EMAIL) {
                // نعم: اجلب كل البيانات الموجودة في الكوكب
                q = query(collection(db, collectionName));
            } else {
                // لا: اجلب بياناتي أنا فقط
                q = query(collection(db, collectionName), where("userId", "==", user.email));
            }

            const querySnapshot = await getDocs(q);
            let results = [];
            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });
            return results;
        } catch (e) {
            console.error("Error getting documents: ", e);
            return [];
        }
    }

    async delete(collectionName, docId) {
        await deleteDoc(doc(db, collectionName, docId));
    }
}

export const dbInstance = new CloudDB();