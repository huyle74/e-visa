import { body } from 'express-validator';

export interface loginDto {
  email: string;
  password: string;
}

export interface Nation {
  iso2: string;
  countryCode: string;
  engName: string;
  code: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  nationIso2: string;
  nation: string;
}

export const loginValidator = [
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const createAccountValidator = [
  body('email')
    .isEmail()
    .notEmpty()
    .withMessage('Invalid Email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email cannot be empty'),
  body('password').notEmpty().withMessage('Password is required'),
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .trim()
    .not()
    .isEmpty()
    .withMessage('First Name cannot be empty'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('phoneNumber').notEmpty().withMessage('Mobile phone is required'),
  body('nation').notEmpty().withMessage('Nationality is required'),
];
