import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
    en: {
        translation: {
            login: "Login",
            register: "Register",
            email: "Email",
            password: "Password",
            username: "Username",
            alreadyHaveAccount: "Already have an account?",
            dontHaveAccount: "Don’t have an account?",
        },
    },
    fr: {
        translation: {
            login: "Connexion",
            register: "S'inscrire",
            email: "E-mail",
            password: "Mot de passe",
            username: "Nom d'utilisateur",
            alreadyHaveAccount: "Vous avez déjà un compte ?",
            dontHaveAccount: "Vous n'avez pas de compte ?",
        },
    },
    gu: {
        translation: {
            login: "પ્રવેશ કરો",
            register: "રજીસ્ટર કરો",
            email: "ઇમેઇલ",
            password: "પાસવર્ડ",
            username: "વપરાશકર્તા નામ",
            alreadyHaveAccount: "હવે એક ખाता છે?",
            dontHaveAccount: "ખાતો નથી?",
        },
    },
};

i18n
    .use(LanguageDetector) // Detects language from browser settings
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en", // Default language
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
