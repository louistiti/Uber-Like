'use strict';

import { api } from '../config/config';

const response = {};

response.success = (res, status, code, ...data) => {
    let message = '';

    if (code === 'rider_added') message = 'Le rider a été ajouté avec succès';
    if (code === 'rider_authenticated') message = 'Le rider a été authentifié avec succès';
    if (code === 'tokens_updated') message = 'Les tokens ont été mis à jour avec succès';
    if (code === 'device_revoked') message = 'L\'accès à l\'application pour cet appareil a été révoqué avec succès';
    if (code === 'device_name_changed') message = 'Le nom de l\'appareil a été modifié avec succès';

    const success = {
        success: true,
        status,
        message,
        code,
        data
    };

    if (data.length === 0) {
        delete success.data;
    }

    res.status(status);
    res.json(success);
};

response.successAdd = (res, code, location, data) => {
    res.location(api().version + location);

    response.success(res, 201, code, data);
};

response.error = (res, status, errors = []) => {
    if (errors.length > 0) {
        const tab = [];

        errors.forEach((error) => {
            if (error === 'missing_params') tab.push({ message: 'Un ou plusieurs paramètre(s) est / sont manquant(s)', code: error });
            if (error === 'too_many_params') tab.push({ message: 'Trop de paramètres ont été envoyés', code: error });
            if (error === 'invalid_param_value') tab.push({ message: 'Valeur(s) d\'un ou plusieurs paramètre est / sont invalide(s)', code: error });
            if (error === 'invalid_phone_number') tab.push({ message: 'Numéro de téléphone invalide', code: error });
            if (error === 'invalid_email_address') tab.push({ message: 'Adresse email invalide', code: error });
            if (error === 'password_too_short') tab.push({ message: 'Mot de passe trop court (6 caractères minimum)', code: error });
            if (error === 'phone_number_already_taken') tab.push({ message: 'Ce numéro de téléphone est déjà existant', code: error });
            if (error === 'email_address_already_taken') tab.push({ message: 'Cette adresse email est déjà existante', code: error });
            if (error === 'invalid_user_type') tab.push({ message: 'Type d\'utilisateur invalide', code: error });
            if (error === 'invalid_grant_type') tab.push({ message: 'Type du grant invalide', code: error });
            if (error === 'invalid_credentials') tab.push({ message: 'Identifiants invalides', code: error });
            if (error === 'invalid_access_token') tab.push({ message: 'Token d\'accès invalide', code: error });
            if (error === 'invalid_refresh_token') tab.push({ message: 'Token de rafraîchissement invalide', code: error });
            if (error === 'invalid_client') tab.push({ message: 'Client invalide', code: error });
            if (error === 'insufficient_rights') tab.push({ message: 'Droits insuffisants', code: error });
            if (error === 'the_device_does_not_belong_to_the_user') tab.push({ message: 'Cet appareil n\'existe pas ou n\'est plus valide', code: error });
        });

        errors = tab;
    }

    const error = {
        success: false,
        status,
        errors
    };

    res.status(status);
    res.json(error);
};

export default response;
