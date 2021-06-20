// const jwt = require("jsonwebtoken");
// const nodemailer = require('nodemailer');
import * as bcrypt from 'bcrypt';
import { CovidSaludConstants } from '../common/CovidSaludConstants';

export class SecurityUtils {
    public static async hashPassword(password: string): Promise<string> {
        try {
            const hashedPassword = await bcrypt.hash(password, CovidSaludConstants.BCRYPT_SALT_ROUNDS);
            return hashedPassword;
        } catch (error) {
            console.log("Could not hash passowrd following error happened: " + error);
            throw error;
        }
    }

    public static async compareStrings(rawString: string, hashedString: string): Promise<boolean> {
        try {
            const validationResult = await bcrypt.compare(rawString, hashedString);
            return validationResult;
        } catch (error) {
            console.log("Could not compare strings, following error happened: " + error);
            throw error;
        }
    }
}



// authenticateToken: function (req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) {
//         console.log("Token is null")
//         res.sendStatus(401)
//     } else {
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET.toString(), (err, claims) => {
//             if (err) {
//                 console.log(err);
//                 res.sendStatus(403)
//             } else {
//                 req.claims = claims
//                 next()
//             }
//         })
//     }
// },
    // generateAccessToken: function (payload) {
    //     return jwt.sign({payload}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
    // }
    // sendCode: function (email, randomCode, firstName, lastName, callback) {
    //     var transporter = nodemailer.createTransport({
    //         service: 'gmail',
    //         auth: {
    //             user: process.env.OTP_EMAIL_USER,
    //             pass: process.env.OTP_EMAIL_PASSWORD
    //         }
    //     })
    //     const mailOptions = {
    //         from: process.env.OTP_EMAIL_USER,
    //         to: email,
    //         subject: 'Recuperación de contraseña de acceso a la aplicación web StoryCards',
    //         html: 'Estimado(a) <span style="text-transform: uppercase;">' + firstName + ' ' + lastName + ':</span> <br><br>' +
    //             'Hemos recibido una solicitud de recuperación de contraseña, su código generado es <strong>' + randomCode + '</strong>. <br><br>' +
    //             'Que tenga un buen día, <br>' +
    //             'Editorial UPC'
    //     };

    //     transporter.sendMail(mailOptions, function (error, info) {
    //         if (error) {
    //             console.log('Error sending mail: ' + error);
    //             return callback(null);
    //         } else {
    //             console.log('Email sent: ' + info.response);
    //             return callback(true);
    //         }
    //     });
    // }

