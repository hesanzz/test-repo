interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    direction: string;
}
export const Button = (props: ButtonProps) => {
    const { onClick, disabled, direction } = props;

    const buttonLabel = direction === "AtoB" ? '->' : '<-';

    return (
        <button onClick={onClick} disabled={disabled}
        > {buttonLabel}</button>
    )

}