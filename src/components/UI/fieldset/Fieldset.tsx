import Input from "@components/UI/input/Input.tsx";
import styles from './Fieldset.module.css'
import classNames from "classnames";
import {IInputOutput} from "@components/types/types.tsx";
import {FC} from "react";

interface FieldsetProps {
    inputs: IInputOutput[]
    className?: string
}

const Fieldset: FC<FieldsetProps> = ({inputs, className}) => {

    return (
        <fieldset className={classNames(styles.fieldset, className)}>
            {inputs.map((input, index) =>
                    <Input key={index}
                        inputOutput={{...input}}/>
                )}

        </fieldset>
    );
};

export default Fieldset;