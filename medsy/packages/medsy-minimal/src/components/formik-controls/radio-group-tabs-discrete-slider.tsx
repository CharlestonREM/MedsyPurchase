export enum ValueLabelDisplayTypes {
    On = "on",
    Auto = "auto",
    Off = "off"
}
interface discreteSlider {
    label: string,
    defaultValue: number,
    getAriaValueText: Function | string,
    ariaLabelledby: string,
    step: number,
    valueLabelDisplay: string,
    //? why are specific strings literals not working?
    // valueLabelDisplay: ValueLabelDisplayTypes,
    marks: boolean | Array<any>,
    min: number,
    max: number
}
interface radioOptionProps {
    key: string,
    value: string,
    optionImageUrl: string,
    discreteSlider: discreteSlider,
}
export interface RadioGroupTabsDiscreteSliderProps {
    label: string,
    name: string,
    options: radioOptionProps[],
}

const RadioGroupTabsDiscreteSlider: React.FC<RadioGroupTabsDiscreteSliderProps> = (props) => {
    console.log(props)
    return (<h1>sup</h1>);
}

export default RadioGroupTabsDiscreteSlider;