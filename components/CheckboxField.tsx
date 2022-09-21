import { ChangeEvent, ReactNode, useCallback } from "react";

interface CheckboxFieldProps {
  id: string;
  checked: boolean;
  help: ReactNode;
  onChecked: (checked: boolean) => void;
}

const CheckboxField = ({
  id,
  checked,
  help,
  onChecked,
}: CheckboxFieldProps) => {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onChecked(e.target.checked),
    [onChecked]
  );
  return (
    <>
      <label className="block mb-1" htmlFor={id}>
        <input
          type="checkbox"
          className="align-middle"
          name={id}
          id={id}
          aria-describedby={`${id}_help`}
          checked={checked}
          onChange={onChange}
        />
        <p className="inline-block ms-4 mb-0">
          <code>{id}</code>
        </p>
      </label>
      <p className="ms-8 mb-8">
        <span id={`${id}_help`}>{help}</span>
      </p>
    </>
  );
};

export default CheckboxField;
