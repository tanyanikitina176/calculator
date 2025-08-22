import type { ReactNode } from 'react';

export type ButtonText = ReactNode | number | string;

export type CalculationButton = Extract<ButtonText, string | number>;
