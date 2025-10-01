import { Text as RNText, TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

type TypographyVariant =
  | 'title'
  | 'subtitle'
  | 'subtitle-primary'
  | 'body'
  | 'body-primary'
  | 'caption'
  | 'caption-primary'
  | 'button'
  | 'display';

interface TextComponentProps extends TextProps {
  className?: string;
  variant?: TypographyVariant;
}

const variantStyles: Record<TypographyVariant, string> = {
  title: 'text-2xl font-bold',
  subtitle: 'text-xl font-semibold',
  'subtitle-primary': 'text-xl font-semibold text-primary',
  body: 'text-base',
  'body-primary': 'text-base text-primary',
  caption: 'text-sm font-medium',
  'caption-primary': 'text-sm text-primary font-medium',
  button: 'text-xl text-primary font-semibold text-white text-center',
  display: 'text-3x font-bold',
};

const Text = ({ variant = 'body', className, children, ...props }: TextComponentProps) => {
  const textStyle = twMerge('text-black', variantStyles[variant], className);

  return (
    <RNText {...props} className={textStyle}>
      {children}
    </RNText>
  );
};

export default Text;
