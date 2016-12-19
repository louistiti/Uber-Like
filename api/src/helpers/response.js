'use strict';

import { api } from '../config/config';

const response = {};

response.success = (res, status = 200, code, ...data) => {
    let message = '';

    if (code === 'rider_added') message = 'Le rider a été ajouté avec succès';

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

response.error = (res, status = 400, errors = []) => {
    if (errors.length > 0) {
        const tab = [];

        errors.forEach((error) => {
            if (error === 'missing_fields') tab.push({ message: 'Un ou plusieurs paramètre(s) est / sont manquant(s)', code: error });
            if (error === 'incorrect_phone_number') tab.push({ message: 'Numéro de téléphone incorrect', code: error });
            if (error === 'incorrect_email_address') tab.push({ message: 'Adresse email incorrecte', code: error });
            if (error === 'password_too_short') tab.push({ message: 'Mot de passe trop court (6 caractères minimum)', code: error });
            if (error === 'phone_number_already_taken') tab.push({ message: 'Ce numéro de téléphone est déjà existant', code: error });
            if (error === 'email_address_already_taken') tab.push({ message: 'Cette adresse email est déjà existante', code: error });
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
