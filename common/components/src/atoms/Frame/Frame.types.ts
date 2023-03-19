export interface FrameProps extends React.HTMLAttributes<HTMLElement> {
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  cornerRadius?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  direction?: 'row' | 'column';
  element?: keyof JSX.IntrinsicElements;
  fillContainer?: boolean;
  horizontalPadding?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
  noWrap?: boolean;
  verticalPadding?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  spacing?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}

export type GroupProps = Omit<FrameProps, 'direction'>;

export type StackProps = Omit<FrameProps, 'direction'>;
