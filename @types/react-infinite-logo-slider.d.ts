declare module 'react-infinite-logo-slider' {
  interface SliderProps {
    children?: ReactNode[];
    width?: string;
    duration?: number;
    toRight?: boolean;
    pauseOnHover?: boolean;
    blurBorders?: boolean;
    blurBoderColor?: string;
    className?: string;
  }

  interface SlideProps {
    children?: ReactNode;
    width?: string;
    className?: string;
  }

  const Slider: React.FC<SliderProps> & {
    Slide: React.FC<SlideProps>;
  };

  export default Slider;
}
