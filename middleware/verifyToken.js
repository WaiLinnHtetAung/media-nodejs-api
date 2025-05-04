import JWT from 'jsonwebtoken';
import UserService from "../services/userService.js";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        next (new Error("Authorization Error"));
        return;
    }

    let token = authHeader.split(' ')[1];

    JWT.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if(err && err.message == "jwt expired") {
            next(new Error("Sesion expired"));
            return;
        }

        if(err) {
            next(new Error("Unauthorized"));
            return;
        }

        console.log("Ready to continue")

        let userId = decoded.id;
        let user = await UserService.getCacheUser(userId);

        if(!user) {
            next(new Error("User does not exist"));
            return;
        }

        req.userId = userId;
        req.user = user;
        next();
    })
}

export const validateRole = (role) => {
    return (req, res, next) => {
        if(req.user.role !== role) {
            next(new Error("You do not have permission."));
            return;
        }

        next();
    }
}

export const validateStaff = (req, res, next) => {
    if(req.user.role > 1) {
        next(new Error("You do not have permission."));
        return;
    }

    next();
}

export const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);

        if(result.error) {
            next(new Error(result.error.details[0].message));
            return;
        }

        next();
    }
}