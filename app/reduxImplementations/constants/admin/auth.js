import ConstantBuilder from 'reduxImplementations/reduxContantHelper';

export const MODULE = "ADMIN";
export const TYPE = "AUTH";
export const INITALIZE = "INITALIZE";


export const INIT_MODULE = ConstantBuilder(MODULE, TYPE, INITALIZE);
export const INPUT_CHANGE = ConstantBuilder(MODULE, TYPE, "INPUT_CHANGED");
export const SET_FORM = ConstantBuilder(MODULE, TYPE, "SET_FORM");
export const CLEAR_FORM = ConstantBuilder(MODULE, TYPE, "CLEAR_FORM");
export const LOGIN_USER = ConstantBuilder(MODULE, TYPE, "LOGIN_USER");
export const LOGG_OFF  = ConstantBuilder(MODULE, TYPE, "LOGG_OFF");