// assets/js/core/auth.js
import { auth } from './firebase-config.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export class Auth {
    constructor() {
        this.currentUser = null;
    }

    // مراقبة حالة المستخدم (هل هو متصل أم لا)
    initAuth(callback) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.currentUser = {
                    email: user.email,
                    name: user.displayName || user.email.split('@')[0],
                    uid: user.uid
                };
            } else {
                this.currentUser = null;
            }
            if (callback) callback(this.currentUser);
        });
    }

    async register(email, password, displayName) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // تحديث اسم المستخدم
            await updateProfile(userCredential.user, { displayName: displayName });
            return { success: true, message: 'تم إنشاء الحساب بنجاح' };
        } catch (error) {
            let msg = error.message;
            if(error.code === 'auth/email-already-in-use') msg = 'البريد الإلكتروني مسجل بالفعل';
            if(error.code === 'auth/weak-password') msg = 'كلمة المرور ضعيفة جداً';
            return { success: false, message: msg };
        }
    }

    async login(email, password) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            return { success: false, message: 'خطأ في البريد أو كلمة المرور' }; // رسالة عامة للأمان
        }
    }

    async logout() {
        await signOut(auth);
        window.location.href = 'index.html';
    }

    checkAuth() {
        // ننتظر قليلاً للتأكد من تحميل Firebase
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.href = 'auth.html';
            }
        });
    }
}

export const authInstance = new Auth();