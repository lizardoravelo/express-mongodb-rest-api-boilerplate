import passport from 'passport';
import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '@model/user'; // Make sure this points to the correct location

interface IRequest extends Request {
  user?: IUser;
}

const handleJWT =
  (req: IRequest, res: Response, next: NextFunction, roles: string[]) =>
  async (err: any, user: IUser | false, info: any) => {
    if (err || !user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    req.user = user;

    if (roles && !roles.includes(user.role)) {
      return res.status(httpStatus.FORBIDDEN).json({ message: 'Forbidden' });
    }

    return next();
  };

const authorize = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate('jwt', { session: false }, handleJWT(req as IRequest, res, next, roles))(req, res, next);
};

export default authorize;
