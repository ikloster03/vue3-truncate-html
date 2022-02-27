import { PropType } from 'vue';
import sanitizeHtml from 'sanitize-html';
import { Classes, Buttons, Type } from './types';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    text: {
        type: StringConstructor;
        default: string;
    };
    length: {
        type: NumberConstructor;
        default: number;
    };
    hideButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: PropType<Type>;
        default: string;
    };
    buttons: {
        type: PropType<Buttons>;
        default: () => Buttons;
    };
    classes: {
        type: PropType<Classes>;
        default: () => Classes;
    };
    sanitizeOptions: {
        type: PropType<sanitizeHtml.IOptions>;
        default: undefined;
    };
}, {
    isHTML: import("vue").ComputedRef<boolean>;
    showButton: import("vue").ComputedRef<boolean>;
    proxyButtonClass: import("vue").ComputedRef<string>;
    proxyText: import("vue").ComputedRef<string>;
    buttonTitle: import("vue").ComputedRef<string>;
    proxyClasses: import("vue").ComputedRef<{
        container: string;
        content: string;
        contentHtml: string;
        contentText: string;
        button: string;
        buttonMore: string;
        buttonLess: string;
    }>;
    toggle: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    text: {
        type: StringConstructor;
        default: string;
    };
    length: {
        type: NumberConstructor;
        default: number;
    };
    hideButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: PropType<Type>;
        default: string;
    };
    buttons: {
        type: PropType<Buttons>;
        default: () => Buttons;
    };
    classes: {
        type: PropType<Classes>;
        default: () => Classes;
    };
    sanitizeOptions: {
        type: PropType<sanitizeHtml.IOptions>;
        default: undefined;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    text: string;
    length: number;
    type: Type;
    hideButton: boolean;
    buttons: Buttons;
    classes: Classes;
    sanitizeOptions: sanitizeHtml.IOptions;
}>;
export default _default;
