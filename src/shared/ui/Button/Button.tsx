import styles from './Button.module.less';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'delete';
}

export function Button({
  type = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`${styles.btn} ${styles[`btn--${variant}`]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
