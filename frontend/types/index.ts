import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ConfirmationOptions = {
  title: string,
  confirmAction: () => any,
  confirmText?: string,
  denyAction?: () => any
}
