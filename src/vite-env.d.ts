declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: any;
  export default content;
}

declare module 'react-vertical-timeline-component' {
  import { ReactNode } from 'react';
  
  export interface VerticalTimelineProps {
    children?: ReactNode;
    className?: string;
    layout?: '1-column' | '2-columns';
    animate?: boolean;
    lineColor?: string;
  }
  
  export interface VerticalTimelineElementProps {
    children?: ReactNode;
    className?: string;
    contentStyle?: React.CSSProperties;
    contentArrowStyle?: React.CSSProperties;
    date?: string;
    dateClassName?: string;
    icon?: ReactNode;
    iconClassName?: string;
    iconStyle?: React.CSSProperties;
    iconOnClick?: () => void;
    position?: string;
    style?: React.CSSProperties;
    textClassName?: string;
    intersectionObserverProps?: any;
    visible?: boolean;
  }
  
  export const VerticalTimeline: React.FC<VerticalTimelineProps>;
  export const VerticalTimelineElement: React.FC<VerticalTimelineElementProps>;
}

declare module 'react-vertical-timeline-component/style.min.css';
