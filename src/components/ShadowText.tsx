import { cn } from '../utils';

export const ShadowText = (props: { children: string; className?: string }) => {
  return (
    <span
      className={cn(
        'text-offwhite select-none text-4xl drop-shadow-hard-sm',
        props.className
      )}
    >
      {props.children}
    </span>
  );
};
