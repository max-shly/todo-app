import styles from './Select.module.less';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'onChange'
> {
  label?: string;
  error?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
}

export function Select({
  label,
  error,
  options,
  id,
  value,
  onChange,
  className = '',
  ...props
}: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={`${styles.wrapper} ${error ? styles.error : ''} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <select id={id} value={value} className={styles.select} onChange={handleChange} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
